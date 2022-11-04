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
        REFERENCES tbl_member (mb_id) ON DELETE CASCADE 
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
        REFERENCES tbl_cage (cage_seq) ON DELETE CASCADE
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
        REFERENCES tbl_cage (cage_seq) ON DELETE CASCADE 
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
        REFERENCES tbl_kit (kit_seq) ON DELETE CASCADE
/

ALTER TABLE tbl_kit_sensoring
    ADD CONSTRAINT FK_tbl_kit_sensoring_mb_id_tbl FOREIGN KEY (mb_id)
        REFERENCES tbl_member (mb_id) ON DELETE CASCADE
/


