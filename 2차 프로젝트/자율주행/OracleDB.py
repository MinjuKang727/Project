import cx_Oracle
# from DB import DAO

class OracleDB() :

	def __init__(self, user_name, pw, address) :
	'''
	[OracleDB class constructor]

	def__init__(user_name, pw, address) :
		self.user_name = user_name
		self.pw = pw
		self.address = address

	** Parameter Description **
	user_name(type: string) : DB access user name
	pw(type: string) : DB access user password
	address(type: string, format: "host:port/SID")

	'''
		self.user_name = user_name
		self.pw = pw
		self.address = address


	def conn_db() :
	'''
	[DB connection method]

	def conn_db() :
		os.putenv('NLS_LANG', '.UTF8') # Support Korean 
    		conn = cx_Oracle.connect(self.user_name, self.pw, self.address)  # Access to DB
    		cursor = conn.cursor()
    		return conn, cursor

	'''
		os.putenv('NLS_LANG', '.UTF8')
    		conn = cx_Oracle.connect(self.user_name, self.pw, self.address)
    		cursor = conn.cursor()
    		return conn, cursor
	

	def close_db(conn, cursor) :
	'''
	[DB disconnection method]

	def close_db(conn, cursor) :
   		cursor.close()
    		conn.close()
	'''
   		cursor.close()
    		conn.close()
	