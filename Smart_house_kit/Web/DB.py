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
            pass
        try :
            if conn != None :
                conn.close() # Connection 통로 닫기    
        except :
            pass
        
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
    def id_ck(ID) :
        result = False
        conn, curs = self.conn_db()  # DB 접속

        cursor.execute("""SELECT count(*) FROM tbl_member 
                        where mb_id= :1 """)
        data = cursor.fetchone()
        self.close_db()  # DB 접속 종료

        if data:  # 조회 결과가 있으면
            if data[0] == 0 :
                result = True

        return result