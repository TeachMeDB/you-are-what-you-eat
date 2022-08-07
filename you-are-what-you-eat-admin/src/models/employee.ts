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
    avater: string;
    /**
     * 员工生日
     */
    birthday: string;
    /**
     * base64的图片
     */
    cover:      string;
    gender:     string;
    id:         string;
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
    "id": "78",
    "name": "定其选南火",
    "gender": "男",
    "occupation": "tempor consectetur qui aute ullamco",
    "birthday": "2001-09-01",
    "attends": [
      {
        "time_start": "2008-08-19 00:03:18",
        "time_end": "1991-09-07 03:38:19",
        "place": "esse do dolore minim",
        "plan_id": "61",
        "attendance": false
      },
      {
        "time_start": "2009-01-18 09:14:35",
        "time_end": "2016-07-31 00:49:49",
        "place": "deserunt",
        "plan_id": "83",
        "attendance": true
      },
      {
        "time_start": "2005-09-07 17:54:39",
        "time_end": "2007-02-14 07:57:50",
        "place": "veniam",
        "plan_id": "94",
        "attendance": false
      },
      {
        "time_start": "2008-03-31 11:37:56",
        "time_end": "1989-08-24 09:07:23",
        "place": "labore",
        "plan_id": "17",
        "attendance": false
      }
    ],
    "payrolls": [
      {
        "pay_datetime": "1993-12-16 01:33:39",
        "amount": 53
      },
      {
        "pay_datetime": "2004-02-27 03:49:49",
        "amount": 99
      },
      {
        "pay_datetime": "1976-02-22 21:37:43",
        "amount": 51
      },
      {
        "pay_datetime": "2017-01-27 06:40:16",
        "amount": 54
      }
    ],
    "prizes": [
      {
        "prize_datetime": "2018-01-13 17:49:03",
        "level": "do",
        "amount": 98
      }
    ],
    "avatar": "http://dummyimage.com/100x100",
    "cover": "ullamco Ut"
  } as EmployeeDetail;



export const defaultUploadEmployee={
    "id":"1090",
    "gender": "女",
    "occupation": "voluptate est veniam dolore",
    "birthday": "1996-10-18",
    "avater": "ullamco cillum ad id velit",
    "cover": "ut",
    "name": "革支性响军果",
    "token": "incididunt amet"
} as EmployeeUpload;