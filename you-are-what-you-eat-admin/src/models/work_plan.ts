export interface WorkPlan {
    occupation: string;
    peoples:    People[];
    place:      string;
    plan_id:    string;
    time_end:   string;
    time_start: string;
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