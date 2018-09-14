import numpy as np
import collections


# 定义字典存放颜色分量上下限
# 例如：{颜色: [min分量, max分量]}
# {'red': [array([160,  43,  46]), array([179, 255, 255])]}

def getColorList():
    dict = collections.defaultdict(list)

    # 红色
    lower_red = np.array([0, 43, 46])
    upper_red = np.array([10, 255, 255])
    color_list = []
    color_list.append(lower_red)
    color_list.append(upper_red)
    dict['red'] = color_list

    # 黄色
    lower_yellow = np.array([20, 43, 100])
    upper_yellow = np.array([60, 255, 255])
    color_list = []
    color_list.append(lower_yellow)
    color_list.append(upper_yellow)
    dict['yellow'] = color_list

    # 绿色
    lower_green = np.array([75, 43, 46])
    upper_green = np.array([100, 255, 255])
    color_list = []
    color_list.append(lower_green)
    color_list.append(upper_green)
    dict['green'] = color_list


    # 蓝色
    lower_blue = np.array([100, 100, 46])
    upper_blue = np.array([110, 255, 130])
    color_list = []
    color_list.append(lower_blue)
    color_list.append(upper_blue)
    dict['blue'] = color_list


    return dict


if __name__ == '__main__':
    color_dict = getColorList()
    print(color_dict)

    num = len(color_dict)
    print('num=', num)

    for d in color_dict:
        print('key=', d)
        print('value=', color_dict[d][1])

