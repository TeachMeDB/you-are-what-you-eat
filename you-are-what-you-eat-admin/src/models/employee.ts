export interface EmployeeEntity {
    /**
     * 本月出勤率
     */
    attendance_rate: number;
    /**
     * 头像url
     */
    avatar: string;
    /**
     * 获奖次数
     */
    award_times: number;
    birthday:    string;
    gender:      string;
    id:          string;
    name:        string;
    occupation:  string;
}


export interface EmployeeDetail {
    attends: Attend[];
    /**
     * 头像url
     */
    avatar:   string;
    birthday: string;
    /**
     * 首页封面url
     */
    cover:      string;
    gender:     string;
    id:         string;
    name:       string;
    occupation: string;
    payrolls:   Payroll[];
    prizes:     Prize[];
}


export interface EmployeeUpload {
    /**
     * base64的图片
     */
    avatar: null | string;
    /**
     * 员工生日
     */
    birthday: string;
    /**
     * base64的图片
     */
    cover:      null | string;
    gender:     string;
    id:         null | string;
    name:       string;
    occupation: string;
}


export interface Attend {
    /**
     * 是否出勤
     */
    attendance: boolean;
    place:      string;
    plan_id:    string;
    time_end:   string;
    time_start: string;
}

export interface Payroll {
    amount:       number;
    pay_datetime: string;
}



export interface Prize {
    amount:         number;
    level:          string;
    prize_datetime: string;
}







export interface Salary {
    amount: number;
    /**
     * 当前职位人数
     */
    count:      number;
    occupation: string;
}

export interface PayrollEntity {
    amount:     number;
    id:         string;
    name:       string;
    occupation: string;
    time:       string;
}


export interface PayrollUpload {
    id:   string;
    time: string;
}





export interface Award {
    /**
     * 金额
     */
    amount: number;
    /**
     * 奖项名字
     */
    level: string;
    /**
     * 获奖人数统计
     */
    summary: number;
}


export interface AwardUpload {
    amount: number;
    level:  string;
}


export interface PrizeEntity {
    amount: number;
    id:     string;
    level:  string;
    name:   string;
    time:   string;
}


export interface PrizeUpload {
    id:    string;
    level: string;
    time:  string;
}




export const defaultUser:EmployeeDetail={
  "id": "1001",
  "name": "戴仁杰",
  "gender": "男",
  "occupation": "经理",
  "birthday": "2001-07-26",
  "avatar": "http://106.14.212.200:8000/images/employees/employee_1001.png",
  "cover": "http://106.14.212.200:8000/images/covers/cover_1001.png",
  "attends": [
    {
      "plan_id": "2",
      "time_start": "2022-05-17 09:00:00",
      "time_end": "2022-05-19 18:00:00",
      "place": "大堂",
      "attendance": true
    }
  ],
  "payrolls": [
    {
      "pay_datetime": "2001-06-06 00:00:00",
      "amount": 30000
    }
  ],
  "prizes": [
    {
      "prize_datetime": "2022-01-09 12:00:00",
      "level": "全勤奖",
      "amount": 5000
    }
  ]
} as EmployeeDetail;
