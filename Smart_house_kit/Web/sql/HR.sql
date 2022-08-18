CREATE TABLE MEMBER(
MNO VARCHAR(5) PRIMARY KEY, MNAME VARCHAR(10) NOT NULL, MID VARCHAR(12) NOT NULL UNIQUE, MPW VARCHAR(20) NOT NULL, MTEL VARCHAR(11) NOT NULL UNIQUE, MMAIL VARCHAR(35) NOT NULL UNIQUE, MANAGER NUMBER(1));

ALTER TABLE MEMBER ADD CONSTRAINT CK_MANAGER CHECK(MANAGER IN (0, 1));

insert into member values('m0001', '∞≠πŒ¡÷', 'KkoKko', 'manager1234','01087338662','minjukang727@gmail.com',1);

select * from member;

ALTER TABLE member ADD (mlogin varchar(6));

update member set mlogin = 'naver' where mno = 'm0001';

ALTER TABLE MEMBER ADD CONSTRAINT CK_MLOGIN CHECK(mlogin IN ('diamond', 'naver','kakao'));

commit;

SELECT * FROM COLS WHERE TABLE_NAME = 'member';

ALTER TABLE member MODIFY (mlogin NOT NULL);

ALTER TABLE member ADD (rdate date, udate date);

ALTER TABLE member MODIFY (rdate NOT NULL, udate not null);

commit;
