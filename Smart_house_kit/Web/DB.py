import cx_Oracle
import os
import pandas as pd

class DAO :

################## DB 접속 #######################
    # DB 접속하기
    def conn_db(self) :
        os.putenv('NLS_LANG', '.UTF8') # 한글 지원하기 
        # 접속하기
        db_id = 'diamond'
        db_pw = '1234'
        db_url = 'project-db-stu.ddns.net:1524/xe'
        conn = cx_Oracle.connect(db_id, db_pw, db_url)
        
        curs = conn.cursor()
        
        return conn, curs
    
    
    # DB 접속 종료하기
    def close_db(self) :
        try :
            if curs != None :
                curs.close() # cursor 통로 닫기
        except :
            print('cursor 종료 실패')

        try :
            if conn != None :
                conn.close() # Connection 통로 닫기    
        except :
            print('connection 종료 실패')
        
##################### 로그인 ######################
    # 로그인 하기
    def login_ck(mlogin,mid,mpw='') :

        conn, curs = self.conn_db()  # DB 접속

	  # 간편로그인 회원일 때,
        sql = """SELECT mb_id, mb_signup_type, mb_type FROM tbl_member 
                            where mb_signup_type= :1 and mb_id= :2"""
        params = [mlogin, mid]

        # DIAMOND 홈페이지 회원가입자일 때,
        if mlogin == 'D' :
            sql += f" and mb_pw= :3 "
            params += [mpw]
        
        result = curs.execute(sql, params)  # sql문 실행
        data = result.fetchone()  # 조회 결과 가져오기
        print(data)
        self.close_db()  # DB 접속 종료
        
        if len(data):  # 조회 결과가 있으면
            session['user_id'] =  data[0]  # 튜플의 0번째 인덱스를 session의 'user_id'에 저장
            session['login_by'] = data[1]  # 튜플의 1번째 인덱스를 session의 'login_by'에 저장
            session['manager'] = data[2]   # 튜플의 2번째 인덱스를 session의 'manager'에 저장
            return redirect(url_for('login_info', info='001777'))
        else :
            return redirect(url_for('login_info', info='001666'))

    # id로 회원정보 불러오기
    def mb_info(mlogin,mid) :
        conn, curs = self.conn_db()  # DB 접속

        sql = """SELECT mb_name, mb_id, mb_phone, mb_email, mb_signup_type, mb_type FROM tbl_member 
                        where mb_signup_type= :1 and mb_id= :2 """ 
        curs.execute(sql,[mlogin, mid])
        data = curs.fetchone()

        self.close_db()  # DB 접속 종료

        if data:  # 조회 결과가 있으면
            return data  # 조회 결과를 반환(이름, ID, 전화번호, 메일주소, 회원가입 경로, 회원유형)
        else :
            return render_template('/404')

    # ID 중복 검사
    def id_ck(mb_id) :
        result = False
        conn, curs = self.conn_db()  # DB 접속

        sql = """SELECT count(*) FROM tbl_member 
                        where mb_id= :1 """
        curs.execute(sql, [mb_id])
        data = cursor.fetchone()

        self.close_db()  # DB 접속 종료

        if len(data):  # 조회 결과가 있으면
            if data[0] == 0 :
                result = True

        return result


############ 커뮤니티 ################
    # 현재 페이지 글 목록 조회하기
    def select_content_list(now,content_type,sort_by='latest',selector='a', search='') :

        conn, curs = self.conn_db()  # DB 접속
        
        params = [content_type]
    
        if selector == 't' :
           query = f"t1.commu_title like '%{search}%'"
        elif selector == 'w' :
            query = f"t1.mb_id like '%{search}%'"
        elif selector == "c" :
           query = f"t1.commu_content like '%{search}%'"
        else :
            query = f"(t1.commu_title like '%{search}%' or t1.commu_content like '%{search}%' or t1.mb_id like '%{search}%')"
       params += [query] 
       
        if sort_by == 'likes' :
            params += ['commu_like']
        elif sort_by == 'views' :
            params += ['commu_views']
        else :
            params += ['commu_update2']
        params += [now, now]

        sql ="""select *  from 
            (select commu_seq, rownum as commu_index, commu_title, mb_id, commu_update, commu_views, commu_like
            from (select t1.commu_seq, t1.commu_title, t1.mb_id, t1.commu_like, t1.commu_views, t1.commu_update, to_char(t1.commu_update, 'YYYY-MM-DD HH24:MI:SS') as commu_update2 
            from tbl_community t1 where t1.commu_type=:1 and :2 order by :3 desc,t1.commu_seq desc))
            where commu_index > (:4 - 1)*20 and commu_index <= :5 * 20"""

        curs.execute(sql, params)
        content_list = curs.fetchall()

        self.close_db()  # DB 접속 종료

        return content_list


    # 총 게시글 수 조회하기
    def contents_total(content_type) :

        conn, curs = self.conn_db()  # DB 접속

        sql = """select ceil(count(*)/20) from tbl_community where commu_type = :1"""

        curs.execute(sql, [content_type])
        data = curs.fetchone()

        if len(data) :
	total = int(data[0])
        else :
	total = 0
    
        self.close_db()  # DB 접속 종료

        return total

    # 게시글번호로 게시글 조회하기
    def call_content(commu_seq) :

        conn, curs = self.conn_db()  # DB 접속

        sql = """select commu_title, commu_content, mb_id, commu_update, commu_like, commu_views, commu_seq from tbl_community where commu_seq= :1"""
        curs.execute(sql, [commu_seq])

        data = cursor.fetchone()
        if len(data) :
            data = data[0]
        else :
            data = ()
       
        self.close_db()  # DB 접속 종료

        return data


    # 조회수 업데이트
    def update_view(commu_seq) :
        conn, curs = self.conn_db()  # DB 접속

        sql = "update tbl_community set commu_views = commu_views + 1 where commu_seq = :1"
        curs.execute(sql, [commu_seq])
        conn.commit()

        self.close_db()  # DB 접속 종료
    

    # 게시글 수정하기
    def update_content(commu_seq, commu_title, commu_content) :
         conn, curs = self.conn_db()  # DB 접속

         sql = "update tbl_community set (commu_title, commu_content, commu_update) = ( :1 , :2 ,sysdate) where commu_seq = :3"
   
         curs.execute(sql, [commu_title, commu_content, commu_seq])
         conn.commit()

         self.close_db()

         return redirect(url_for('community'))