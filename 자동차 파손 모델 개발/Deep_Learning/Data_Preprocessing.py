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
    
