
> 객체지향프로그래밍(Object-Oriented Programming) : 자바 


객체란?

. 세상에 존재하는 것(유무형)
. 사람/동물/사물/예약/주문/배송/느낌/감정 등 지극히 개념적인 것. 

(1) 고유한 속성 
(2) 타인도 알 수 있는 것 
(3) 사전에 등록된 명사 

A : "우리 오늘 점심 때 라면 먹을래?"
B : "응, 그래 좋아!"

            라면  --> 객체(o)
   "오뚜기진라면"  --> 인스턴스(o)             


---------------------------------------------------------------------
고유한 속성 --> 자바에서 어떻게 표현하지? 

> Primitive Type(원시/초기/기초/기본 타입)
정수형(4)
. byte     ... 8 bit :2^8=256(-128~-1, 0~127)
. short    ...16 bit
. int      ...32 bit
. long     ...64 bit
실수형(2)
. float    ...32 bit
. double   ...64 bit
문자형(1)
. char     ...16 bit 유니코드
불린형(1)
. boolean  ...True/False

비트(bit) :컴퓨터에서 정보를 표시하기 위한 최소단위(0,1)

---------------------------------------------------------------------
> 속성 + 기능까지 포함된 객체들은 ? : class

(1) 사용자 정의 클래스(user-defined class)  : Student 
(2) 내장 클래스(built-in class) : ArrayList / String / Integer / Double / Random / Date / Calendar etc

학생 : 이름/나이/학과  +  출석하다()/공부하다()/시험보다()
      --------------     ------------------------------
          (속성)                   (기능)

public class Student {                      // 클래스 이름
   
   private String name;                     // 속성:멤버필드
   private int age;

   
   public Student()                         // 생성자1
   {
   
   }
   
   public Student(String name, int age)     // 생성자1
   {
      this.name = name;
      this.age  = age;
   }
   
   public void setName(V name) {            // 기능:멤버함수
         this.name = name;
   }
      
   public V getName() {
         return this.name;
   }

   public void setAge(int age) {
      this.age = age;
   }
   
   public int getAge() {
      return this.age;
   }
   
   
}          

(1) 객체 ──┐
(2) PrimitiveType (기초타입)
(3) Reference Type(클래스/추상클래스/인터페이스)

---------------------------------------------------------------------
> 추상 클래스(Abstract Class)

(TYPE)            (SUBTYPE)
구기종목 : 축구/야구/농구/배구/탁구
가전제품 : TV/냉장고/세탁기/전자렌지
모양     : 세모/네모/동그라미/마름모/별모양
색깔     : 빨강/노랑/파랑/초록/보라

class C extends A   (o)
class C extends A, B(x) // java 중복상속 금지!

---------------------------------------------------------------------
> 인터페이스(interface) : 객체들간에 자주 발생하는 동작이나 상태를 미리 정의해 놓은 것. 

    face <---> face 
        .talk()
        .fight()


public interface Human {
   public void talk();
   public void fight();
}

public class Boy implements Human {
   @Override // 재정의
   public void talk()
   {
      System.out.println("Boy is talking..");
   }
   @Override
   public void fight()
   {
      System.out.println("Boy is fighting..");
   }
}

public void talk() // 선언부(head)
{
   ...             // 구현부(body)
}

public interface ITV {
   public void on();
   public void off();
   public void switchChannel(int channel);
}

Tom Crusso : "There is no new thing under the sun." (1923)

int a = 10;
Student s1 = new Student(); //s1 인스턴스 참조변수 

Student.java  --> Student.class --> JVM(Java Virtual Machine) --> Runtime Data Area 

[     ]       [      ]     [Stack Areas]   [Heap Area]      [     ]
                               a=10
                               s1=메모리주소  new Student()
---------------------------------------------------------------------

(o) Student s1 = new Student();
(x) Human   h1 = new Human();
(o) Boy     h1 = new Boy();
(o) Human   h1 = new Boy();

ex) List list = new ArrayList();


Student s1 = new Student();


Student s1 = new Student("Tomson", 28);
Student s2 = new Student("Jack",   25);
Student s3 = new Student("Bill",   24);
Student s4 = new Student("John",   26);
Student s5 = new Student("Steve",  28);

ArrayList<Student> list = new ArrayList<Student>();


list.add(s1);
list.add(s2);
list.add(s3);
list.add(s4);
list.add(s5);

list = {s1, s2, s3, s4, s5}

for (int i=0; i < list.size(); i++)
{
   Student s = list.get(i);
   System.out.println(s.getName());
}

for (Student s : list)
{
   System.out.println(s.getName());
}

---------------------------------------------------------------------

회원 관리 = {회원1, 회원2, 회원3, 회원4, 회원5, ... } <--인스턴스 집합 : 엔티티(Entity)

회원 관리      MEMBERINFO / MEMBERS /T_MEMBER / TBL_MEMBER 
---------------------------------------------------------------------
회원 아이디    MB_ID VARCHAR2(20) NOT NULL
회원 비밀번호  MB_PW VARCHAR2(20) NOT NULL
회원 이름     MB_NAME VARCHAR2(40) NOT NULL 
회원 이메일   MB_EMAIL VARCHAR(50) NOT NULL
---------------------------------------------------------------------

CREATE TABLE T_MEMBER (
 MB_ID VARCHAR2(20) NOT NULL,
 MB_PW VARCHAR2(20) NOT NULL,
 MB_NAME VARCHAR2(40) NOT NULL,
 MB_EMAIL VARCHAR(50) NOT NULL, 
 CONSTRAINT PK_MEMBER PRIMARY KEY(MB_ID)
);

CREATE TABLE T2 (
   ...
   ...
   ...
);

쌤! 제가 타이핑을 쳐서 테이블을 만들고 있습니다. 손가락이 너무 아픕니다.
더 편한 방법이 업떠요? 이떠요. 모죠? DB설계툴! ??? 

(1) https://www.erwin.com      (전세계 1위) <--'네카라쿠배당토직야'
(2) https://www.erdcloud.com 
(3) https://www.aquerytool.com , https://aquerytool.com (국산허접,but..)

--------------------------------------------------------------------------------
(다이아몬드 최종 SQL문)

-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- tbl_member Table Create SQL
CREATE TABLE tbl_member
(
    mb_id       VARCHAR2(20)    NOT NULL, 
    mb_pw       VARCHAR2(20)    NOT NULL, 
    mb_name     VARCHAR2(20)    NOT NULL, 
    mb_phone    VARCHAR2(20)    NOT NULL, 
    mb_email    VARCHAR2(30)    NOT NULL, 
    mb_type     CHAR(1)         NOT NULL, 
     PRIMARY KEY (mb_id)
)
/

COMMENT ON TABLE tbl_member IS '회원'
/

COMMENT ON COLUMN tbl_member.mb_id IS '회원 아이디'
/

COMMENT ON COLUMN tbl_member.mb_pw IS '회원 비밀번호'
/

COMMENT ON COLUMN tbl_member.mb_name IS '회원 이름'
/

COMMENT ON COLUMN tbl_member.mb_phone IS '회원 전화번호'
/

COMMENT ON COLUMN tbl_member.mb_email IS '회원 이메일'
/

COMMENT ON COLUMN tbl_member.mb_type IS '회원 유형. 유저:U, 관리자:A'
/

CREATE UNIQUE INDEX UQ_tbl_member_2
    ON tbl_member(mb_email)
/

CREATE UNIQUE INDEX UQ_tbl_member_1
    ON tbl_member(mb_phone)
/


-- tbl_cage Table Create SQL
CREATE TABLE tbl_cage
(
    cage_seq     NUMBER(12, 0)    NOT NULL, 
    cage_name    VARCHAR2(30)     NOT NULL, 
    mb_id        VARCHAR2(20)     NOT NULL, 
     PRIMARY KEY (cage_seq)
)
/

CREATE SEQUENCE tbl_cage_SEQ
START WITH 1
INCREMENT BY 1;
/

CREATE OR REPLACE TRIGGER tbl_cage_AI_TRG
BEFORE INSERT ON tbl_cage 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT tbl_cage_SEQ.NEXTVAL
    INTO :NEW.cage_seq
    FROM DUAL;
END;
/

--DROP TRIGGER tbl_cage_AI_TRG; /

--DROP SEQUENCE tbl_cage_SEQ; /

COMMENT ON TABLE tbl_cage IS '사육장'
/

COMMENT ON COLUMN tbl_cage.cage_seq IS '사육장 순번'
/

COMMENT ON COLUMN tbl_cage.cage_name IS '사육장 명'
/

COMMENT ON COLUMN tbl_cage.mb_id IS '회원 아이디'
/

ALTER TABLE tbl_cage
    ADD CONSTRAINT FK_tbl_cage_mb_id_tbl_member_m FOREIGN KEY (mb_id)
        REFERENCES tbl_member (mb_id)
/


-- tbl_kit Table Create SQL
CREATE TABLE tbl_kit
(
    kit_seq          NUMBER(12, 0)    NOT NULL, 
    kit_name         VARCHAR2(30)     NOT NULL, 
    kit_inst_date    DATE             NOT NULL, 
    cage_seq         NUMBER(12, 0)    NOT NULL, 
     PRIMARY KEY (kit_seq)
)
/

CREATE SEQUENCE tbl_kit_SEQ
START WITH 1
INCREMENT BY 1;
/

CREATE OR REPLACE TRIGGER tbl_kit_AI_TRG
BEFORE INSERT ON tbl_kit 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT tbl_kit_SEQ.NEXTVAL
    INTO :NEW.kit_seq
    FROM DUAL;
END;
/

--DROP TRIGGER tbl_kit_AI_TRG; /

--DROP SEQUENCE tbl_kit_SEQ; /

COMMENT ON TABLE tbl_kit IS '자동제어 키트'
/

COMMENT ON COLUMN tbl_kit.kit_seq IS '키트 순번'
/

COMMENT ON COLUMN tbl_kit.kit_name IS '센서키트 명'
/

COMMENT ON COLUMN tbl_kit.kit_inst_date IS '센서 설치일'
/

COMMENT ON COLUMN tbl_kit.cage_seq IS '사육장 순번'
/

ALTER TABLE tbl_kit
    ADD CONSTRAINT FK_tbl_kit_cage_seq_tbl_cage_c FOREIGN KEY (cage_seq)
        REFERENCES tbl_cage (cage_seq)
/


-- tbl_pet Table Create SQL
CREATE TABLE tbl_pet
(
    pet_seq      NUMBER(12, 0)    NOT NULL, 
    pet_name     VARCHAR2(20)     NOT NULL, 
    pet_type     VARCHAR2(30)     NOT NULL, 
    pet_birth    DATE             NOT NULL, 
    cage_seq     NUMBER(12, 0)    NOT NULL, 
     PRIMARY KEY (pet_seq)
)
/

CREATE SEQUENCE tbl_pet_SEQ
START WITH 1
INCREMENT BY 1;
/

CREATE OR REPLACE TRIGGER tbl_pet_AI_TRG
BEFORE INSERT ON tbl_pet 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT tbl_pet_SEQ.NEXTVAL
    INTO :NEW.pet_seq
    FROM DUAL;
END;
/

--DROP TRIGGER tbl_pet_AI_TRG; /

--DROP SEQUENCE tbl_pet_SEQ; /

COMMENT ON TABLE tbl_pet IS '애완동물'
/

COMMENT ON COLUMN tbl_pet.pet_seq IS '애완동물 순번'
/

COMMENT ON COLUMN tbl_pet.pet_name IS '애완동물 이름'
/

COMMENT ON COLUMN tbl_pet.pet_type IS '애완동물 종'
/

COMMENT ON COLUMN tbl_pet.pet_birth IS '애완동물 년월일'
/

COMMENT ON COLUMN tbl_pet.cage_seq IS '사육장 순번'
/

ALTER TABLE tbl_pet
    ADD CONSTRAINT FK_tbl_pet_cage_seq_tbl_cage_c FOREIGN KEY (cage_seq)
        REFERENCES tbl_cage (cage_seq) 
/


-- tbl_kit_sensoring Table Create SQL
CREATE TABLE tbl_kit_sensoring
(
    sv_seq      NUMBER(12, 0)    NOT NULL, 
    kit_seq     NUMBER(12, 0)    NOT NULL, 
    sv_value    NUMBER(12, 2)    NOT NULL, 
    sv_date     DATE             NOT NULL, 
    mb_id       VARCHAR2(20)     NOT NULL, 
     PRIMARY KEY (sv_seq)
)
/

CREATE SEQUENCE tbl_kit_sensoring_SEQ
START WITH 1
INCREMENT BY 1;
/

CREATE OR REPLACE TRIGGER tbl_kit_sensoring_AI_TRG
BEFORE INSERT ON tbl_kit_sensoring 
REFERENCING NEW AS NEW FOR EACH ROW 
BEGIN 
    SELECT tbl_kit_sensoring_SEQ.NEXTVAL
    INTO :NEW.sv_seq
    FROM DUAL;
END;
/

--DROP TRIGGER tbl_kit_sensoring_AI_TRG; /

--DROP SEQUENCE tbl_kit_sensoring_SEQ; /

COMMENT ON TABLE tbl_kit_sensoring IS '센서 값'
/

COMMENT ON COLUMN tbl_kit_sensoring.sv_seq IS '센서값 순번'
/

COMMENT ON COLUMN tbl_kit_sensoring.kit_seq IS '키트 순번'
/

COMMENT ON COLUMN tbl_kit_sensoring.sv_value IS '센서 값'
/

COMMENT ON COLUMN tbl_kit_sensoring.sv_date IS '측정 일자'
/

COMMENT ON COLUMN tbl_kit_sensoring.mb_id IS '회원 아이디'
/

ALTER TABLE tbl_kit_sensoring
    ADD CONSTRAINT FK_tbl_kit_sensoring_kit_seq_t FOREIGN KEY (kit_seq)
        REFERENCES tbl_kit (kit_seq) 
/

ALTER TABLE tbl_kit_sensoring
    ADD CONSTRAINT FK_tbl_kit_sensoring_mb_id_tbl FOREIGN KEY (mb_id)
        REFERENCES tbl_member (mb_id)
/



---------------------------------------------------------------------
AI(Auto INCREMENT)

CREATE SEQUENCE tbl_cage_SEQ
START WITH 1
INCREMENT BY 1;
/

(현재값) 0 : tbl_cage_SEQ.CURRVAL
(다음값) 1 : tbl_cage_SEQ.NEXTVAL

CREATE OR REPLACE TRIGGER tbl_cage_AI_TRG
BEFORE INSERT ON tbl_cage --DML(INSERT/UPDATE/DELETE)에만 사용가능하고, SELECT문에는 쓸 수 없다.
REFERENCING NEW AS NEW FOR EACH ROW --여러 행의 INSERT문을 실행할 때 각 행에 대해 적용됨
BEGIN 
    SELECT tbl_cage_SEQ.NEXTVAL
    INTO :NEW.cage_seq
    FROM DUAL;  --DUAL은 간단하게 사용할 수 있는 테이블
END;
/

SELECT 3 + 2 FROM DUAL;
SELECT SYSDATE FROM DUAL;
SELECT 'I LOVE YOU' FROM DUAL;

INSERT INTO tbl_cage ( cage_name, mb_id) 
VALUES ('cage_name 1', 'mb_id 1');

NEW.cage_seq = 1
NEW.cage_name = 'cage_name 1'



INSERT INTO tbl_cage (cage_name, mb_id) VALUES ('cage_name 1', 'mb_id 1');
INSERT INTO tbl_cage (cage_name, mb_id) VALUES ('cage_name 2', 'mb_id 2');
INSERT INTO tbl_cage (cage_name, mb_id) VALUES ('cage_name 3', 'mb_id 3');
INSERT INTO tbl_cage (cage_name, mb_id) VALUES ('cage_name 4', 'mb_id 4');
INSERT INTO tbl_cage (cage_name, mb_id) VALUES ('cage_name 5', 'mb_id 5');
