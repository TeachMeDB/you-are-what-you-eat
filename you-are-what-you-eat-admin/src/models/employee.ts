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
