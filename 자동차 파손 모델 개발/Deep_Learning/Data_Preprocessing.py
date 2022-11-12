import os

class data_preprocessing :

    def __init__(self, root_path) :
        ''' 
        Signature :
        data_preprocessing(root_folder=None)
        Docstring:
        data_preprocessing인스턴스 생성
        
        Parameter 
        _________
        root_path : 루트 폴더 경로
        '''
        self.root = []
        for path in root_path :
            self.root.append(path)
    
    
def getFileDirs(self, root_dirs, target_f, *ignore_f) :
    '''
    Signature :
    getFileDirs(self, root_dirs, target_f, *ignore_f) :
    Docstring:
    root_dirs의 하위 폴더 및 파일을 조회하여
    ignore_f에 포함되어 있는 파일을 제외하고 target_f에 포함된 파일이 있는 경로를 반환
    
    Parameter 
    _________
    root_dirs (list) : 하위 폴더들을 조회하고자 하는 경로가 문자열로 담긴 리스트
    target_f (list) : 경로를 알고 싶은 '파일명.확장자' 혹은 '.확장자'의 문자열이 담긴 리스트
    ignore_f (list) : 폴더 정보 수집시, 무시할 '파일명.확장자' 혹은 '.확장자'의 문자열이 담긴 리스트
    '''

    search_dirs = root_dirs.copy()  # 조회 할 경로 리스트
    end_dirs = []  # 하위 폴더 조회가 모두 끝난 경로만 모은 리스트
    i = 1  # 반복문 조회 횟수를 담은 변수 : 경로 조회 진행 정도 파악용 

    while True :
        append_list = []  # dir_list에 추가할 경로를 담을 리스트
        print(f'\r{i}번째 조회', end="")  # 반복문 조회 횟수 출력

        # 경로 리스트의 경로를 하나씩 조회해보자.
        for path in search_dirs :
            f_list = os.listdir(path)  # 경로의 폴더 리스트 조회
            # 조회된 파일리스트에서 폴더명만 리스트에 담기
            f_list2 = [f for f in f_list if (f not in ignore_f + target_f)]

            if 0 < len(f_list2) :  # 조회된 폴더가 있으면,
                append_list += [f"{path}{f}'/'"  if path.endswith('/') else f"{path}/{f}'/'" for f in f_list2]  # append_list에 경로를 추가
                dir_list.remove(path)  # 조회 완료된 경로는 제거
            elif len(f_list2) == 0 :  # 조회된 폴더가 없으면,
                end_dir_list.append(dir0)  # 조회가 완료된 경로로 end_dir_list에 추가
                dir_list.remove(dir0)  # 조회 완료된 경로는 제거
        dir_list += append_list  # dir_list에 새로 조회된 경로 추가

        if ori_dir_list == dir_list :  # 경로 조회 전과 경로 조회 후, 경로 리스트가 같으면,(새로 조회된 경로가 없으면)
            break  # 반복문 실행 중지
        else :  # 새로 조회된 경로가 있으면,
            ori_dir_list = dir_list.copy()  # ori_dir_list를 dir_list로 업데이트
            i += 1  # 반복문 조회 횟수 + 1

    print()   
    # 경로 조회 완료 후, 경로 리스트 출력
    for f in end_dir_list :
        print(f)