export interface ScheduleEntity {
    occupation: string;
    peoples:    People[];
    place:      string;
    plan_id:    string;
    time_end:   string;
    time_start: string;
}


export interface ScheduleUpload {
    employee_ids: string[];
    occupation:   string;
    place:        string;
    time_end:     string;
    time_start:   string;
}



export interface Avaliable {
    gender:                       string;
    id:                           string;
    name:                         string;
}

export interface People {
    /**
     * 是否出勤
     */
    attendance: boolean | null;
    gender:     null | string;
    id:         string;
    name:       null | string;
}