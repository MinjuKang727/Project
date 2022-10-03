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


############ 마이페이지 #############
    # 센서 현재 상태 확인
    def sensor_condition(data) :
        for kit in [('DHT11_HUMI',['건조', 50, '정상', 80, '과습']), ('DHT11_TEMP',['저온', 20, '정상',  30, '고온'])] :
            try :
                dergree = data['kit'][kit[0]]
                if degree < kit[1][1] :
                    data['kit'][kit[0]] = [degree,kit[1][0]]
                elif degree < kit[1][3] :
                    data['kit'][kit[0]] = [degree,kit[1][2]]
                else :
                    data['kit'][kit[0]] = [degree,kit[1][4]]
                if data['kit'][kit[0]][-1] != '정상' :
                    cursor.execute(f"""
                    select (SYSDATE - t1.sv_date) AS DELAY
                    from tbl_kit_sensoring t1
                    inner join tbl_kit t2
                    on t1.kit_seq=t2.kit_seq
                    where t2.cage_seq = {data['cage_seq']} and t2.kit_name = '{kit[0]}'
                    and t1.sv_date = 
                    (select MAX(sv_date) from tbl_kit_sensoring where kit_seq = t1.kit_seq AND SV_VALUE > {kit[1][1]} AND SV_VALUE < {kit[1][3]})

                    union all

                    select (sysdate - kit_inst_date) as DELAY from tbl_kit where cage_seq = {data['cage_seq']} and kit_name = '{kit[0]}'
                    and not exists
                    (select (SYSDATE - t1.sv_date) AS DELAY
                    from tbl_kit_sensoring t1
                    inner join tbl_kit t2
                    on t1.kit_seq=t2.kit_seq
                    where t2.cage_seq = {data['cage_seq']} and t2.kit_name = '{kit[0]}'
                    and t1.sv_date = 
                    (select MAX(sv_date) from tbl_kit_sensoring where kit_seq = t1.kit_seq AND SV_VALUE > {kit[1][1]} AND SV_VALUE < {kit[1][3]}))
                    """)
                    data1 = cursor.fetchall()
                    time = float(data1[0][0])
                    data['kit'][kit[0]] += [cal_delay(time)]
            except :
                pass
        for kit in ['HEATING_PAD','HUMIDIFIER','COOLING_PAN8*8','COOLING_PAN8*8'] :
            try :
                if int(date['kit'][kit]) == 1 :
                    date['kit'][kit] = '켜짐'
                elif int(date['kit'][kit]) == 0 :
                    date['kit'][kit] = '꺼짐'
                else :
                    date['kit'][kit] = '에러' 
            except :
                pass
        return data


    # 사육장 목록 조회하기
    def call_cage_list(mb_id) :  # 케이지 번호, 이름, 애완동물 종류, 애완동물 이름
        os.putenv('NLS_LANG', '.UTF8') # 한글 지원하기
        conn = cx_Oracle.connect('diamond','1234','project-db-stu.ddns.net:1524/xe')
        cursor = conn.cursor()
        cursor.execute(f"""
            SELECT T3.CAGE_SEQ, T3.CAGE_NAME, LISTAGG(T3.PET_TYPE,'/') WITHIN GROUP (ORDER BY T3.PET_TYPE) AS PET_TYPE, LISTAGG(T3.PET_NAME,'/') WITHIN GROUP (ORDER BY T3.PET_NAME) AS PET_NAME
            FROM (SELECT T1.CAGE_SEQ, T1.CAGE_NAME,T2.PET_TYPE, LISTAGG(T2.PET_NAME,',') WITHIN GROUP (ORDER BY T2.PET_NAME) AS PET_NAME, T1.MB_ID
            FROM TBL_CAGE T1, TBL_PET T2
            WHERE T1.CAGE_SEQ = T2.CAGE_SEQ
            GROUP BY T1.CAGE_SEQ, T1.CAGE_NAME, T2.PET_TYPE, T1.MB_ID
            ORDER BY T1.CAGE_SEQ, COUNT(T2.PET_TYPE) DESC) T3
            WHERE T3.MB_ID = '{mb_id}'
            GROUP BY T3.CAGE_SEQ, T3.CAGE_NAME
        """)
        data = cursor.fetchall()
        cursor.close()
        conn.close()
        if data :
            cage_list = []
            for cage in data :
                cage_info = [cage[0],cage[1]]
                for i in range(2,4) :
                    if len(cage[i]) > 10 :
                        comma_index = 0
                        slash_index = 0
                        if ',' in cage[i][:11] :
                            comma_index = cage[i][:11].rindex(',')
                        if '/' in cage[i][:11] :
                            slash_index = cage[i][:11].rindex('/')
                        index = max(comma_index, slash_index)
                        cage_info.append(cage[i][:index+1]+'...')
                    else :
                        cage_info.append(cage[i])
                cage_list.append(cage_info)
            return cage_list
        else :
            return []


    # 사육장번호로 사육장 정보 조회하기
    def call_cage_seq(mb_id, cage_seq) :
        os.putenv('NLS_LANG', '.UTF8') # 한글 지원하기
        conn = cx_Oracle.connect('diamond','1234','project-db-stu.ddns.net:1524/xe')
        cursor = conn.cursor()
        cursor.execute(f"select cage_name from tbl_cage where cage_seq = {cage_seq} and mb_id = '{mb_id}'")
        data = cursor.fetchall()
        if data != [] :
            data = {'cage_seq': cage_seq, 'cage_name' : data[0][0]}
            cursor.execute(f"""
                select t1.kit_name, t2.sv_value
                from (select t3.kit_seq, max(t3.sv_date) as sv_date, t4.kit_name 
                from tbl_kit_sensoring t3, tbl_kit t4 
                where t4.kit_seq=t3.kit_seq and t4.cage_seq = {cage_seq}
                group by t3.kit_seq, t4.kit_name) t1
                inner join tbl_kit_sensoring t2 
                on t1.kit_seq = t2.kit_seq
                where t1.sv_date = t2.sv_date
            """)
            data1 = cursor.fetchall()
            data['kit'] = dict(data1)
            cursor.execute(f"""
                select distinct t3.pet_type, listagg(t3.pet_info, '\n') WITHIN GROUP (ORDER BY t3.pet_info) AS PET_INFO
                FROM (select PET_TYPE, (PET_NAME ||'('||
                (CASE
                WHEN PET_GENDER = 'f' THEN '♀'
                WHEN PET_GENDER = 'm' THEN '♂'
                ELSE '?'
                END)
                ||')') as pet_info
                from tbl_pet WHERE CAGE_SEQ=2) T3 GROUP BY T3.PET_TYPE
                """)
            data2 = cursor.fetchall()
            data['pet'] = data2
            result = sensor_condition(data)
            cursor.close()
            conn.close()
            return result
        else :
            cursor.close()
            conn.close()
            return redirect(url_for('mypage_info', info='365666'))

    # 사육장 상태 그래프 조회하기
    def load_graph(today,  mb_id, cage_seq) :
        os.putenv('NLS_LANG', '.UTF8') # 한글 지원하기
        conn = cx_Oracle.connect('diamond','1234','project-db-stu.ddns.net:1524/xe')
        cursor = conn.cursor()
        cursor.execute(f"""
            select trunc(avg(sv_value),2), to_char(median(sv_date), 'AM HH:MI') from tbl_kit_sensoring t1 inner join tbl_kit t2 on t1.kit_seq = t2.kit_seq where t2.kit_name = 'DHT11_TEMP' and to_char(sv_date, 'YYYY-MM-DD') = '{today}' GROUP BY to_char(sv_date, 'AM HH:MI')
                """)

        data = cursor.fetchall()
        temp = [[a[0] for a in data],[a[1] for a in data]]

        cursor.execute(f"""
            select trunc(avg(sv_value),2), to_char(median(sv_date), 'AM HH:MI') from tbl_kit_sensoring t1 inner join tbl_kit t2 on t1.kit_seq = t2.kit_seq where t2.kit_name = 'DHT11_HUMI' and to_char(sv_date, 'YYYY-MM-DD') = '{today}' GROUP BY to_char(sv_date, 'AM HH:MI')
                """)

        data = cursor.fetchall()
        humi = [[a[0] for a in data],[a[1] for a in data]]

        cursor.execute(f"""
            select trunc(avg(sv_value),2), to_char(median(sv_date), 'AM HH:MI') from tbl_kit_sensoring t1 inner join tbl_kit t2 on t1.kit_seq = t2.kit_seq where t2.kit_name = 'PAD_TEMP' and to_char(sv_date, 'YYYY-MM-DD') = '{today}' GROUP BY to_char(sv_date, 'AM HH:MI')
                """)

        data = cursor.fetchall()
        pad_temp = [[a[0] for a in data],[a[1] for a in data]]


        plt.figure(figsize=(20,8))
        plt.plot(range(0, 6,1), temp[0], c='red', marker='*')
        plt.plot(range(0, 6,1), humi[0], c='blue', marker='*')
        plt.plot(range(0, 6,1), pad_temp[0], c='orange', marker='*')
        plt.xticks(range(0, 6,1), labels=temp[1], rotation=45)
        plt.xlim(0, 5)
        plt.ylim(10, 60)
        plt.grid()
        plt.title(f'Today_Sensoring({today})')
        plt.savefig(f'./static/img/{today}_{mb_id}_{cage_seq}.png')
        cursor.close()
        conn.close()