from OracleDB import OracleDB, OracleDB.conn_db as conn_db, OracleDB.close_db as close_db
# from DB import DAO

OracleDB = OracleDB('dct','1234','project-db-stu.ddns.net:1524/xe')


########## LOGIN ############

def login_ck(M_ID, M_PW='') :
'''
[DCT LOGIN FUNCTION] - This function is used in login at DCT by ID and password

def login_ck(M_ID, M_PW='') :

** Parameter discription **
M_ID(type: string) : Login ID
M_PW(type: string, default value: '') : Login password

'''
	conn, cursor = conn_db()  # Connect to DB

	query = """SELECT M_NO, M_ID FROM MEMBERS
      		WHERE M_ID = :1 AND M_PW = :2 """
	cursor.execute(query, [M_ID, M_PW])  # Execute Query
   
    data = cursor.fetchone()  # Get query result(one tuple)
    close_db(conn, cursor)  # Disconnect from DB
    
    # When valid ID and PW are entered, session update
    if data != None :
        session['USER_NO'] =  data[0]
        session['USER_ID'] = data[1]
        return redirect(url_for('index_info', info='001777'))  # relocate to login success page
    
    # Invalid ID and PW are entered,
    else :
        return redirect(url_for('login_info', info='001666'))  # relocate to login fail page

    

def getMemberInfo(M_ID) :  
'''
[Member information lookup function]
 - This function is used to Get member information by M_ID

def getMemberInfo(M_ID)

** Parameter discription **
M_ID(type: string) : MEMBER ID

'''
	conn, cursor = conn_db()  # Connect to DB
    
	query = """SELECT M_NO, M_NAME, M_TEL, M_ID, M_PW FROM MEMBERS
		where M_ID = :1"""
	cursor.execute(query, [M_ID])  # Execute Query
	data = cursor.fetchone()  # Get query result(one tuple)
	close_db(conn, cursor)  # Disconnect from DB
    
	if data:
		return data
	else :
		return render_template('/404')


############## Signup #################

# 아이디 중복 체크
def check_id(M_ID) :

'''
def check_id(M_ID) :

[ID REDUNDANCY CHECK FUNCTION] - This function is used to check up ID redundancy when signup.
'''
    conn, cursor = conn_db()  # Connect to DB
    
    query = f"""SELECT COUNT(*) FROM MEMBERS WHERE M_ID = :1;"""
    cursor.execute(query, [M_ID])  # Execute query 
    data = cursor.fetchone()  # Get query result(one tuple)
    close_db(conn, cursor)  # Disconnect from DB
    
    if data <= 0:
        return False
    else :
        return True
