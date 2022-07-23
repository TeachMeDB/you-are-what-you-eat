import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    Grid
} from '@mui/material';


export interface StuffMember {
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
    gender: string;
    id: string;
    name: string;
    occupation: string;
}




function Stuff() {
    const employees:StuffMember[] = [
        {
            "id": "43",
            "name": "机每面以利",
            "gender": "男",
            "occupation": "ex amet culpa",
            "attendance_rate": 66,
            "award_times": 1267057860920,
            "avatar": "http://dummyimage.com/100x100"
        },
        {
            "id": "42",
            "name": "引更龙接成真",
            "gender": "男",
            "occupation": "voluptate esse",
            "attendance_rate": 90,
            "award_times": 1107224790631,
            "avatar": "http://dummyimage.com/100x100"
        },
        {
            "id": "35",
            "name": "于政有",
            "gender": "女",
            "occupation": "do ut",
            "attendance_rate": 61,
            "award_times": 1213420216522,
            "avatar": "http://dummyimage.com/100x100"
        },
        {
            "id": "29",
            "name": "进对包",
            "gender": "女",
            "occupation": "velit",
            "attendance_rate": 89,
            "award_times": 1132758112786,
            "avatar": "http://dummyimage.com/100x100"
        }
    ]

    return (
        <Card>
            <CardHeader title="同职位同事" />
            <Divider />
            <Box p={2}>
                <Grid container spacing={0}>
                    {employees.map((stuff:StuffMember) => (
                        <Grid key={stuff.id} item xs={12} sm={6} lg={4}>
                            <Box p={3} display="flex" alignItems="flex-start">
                                <Avatar src={stuff.avatar} />
                                <Box pl={2}>
                                    <Typography gutterBottom variant="subtitle2">
                                        {stuff.id}
                                    </Typography>
                                    <Typography variant="h4" gutterBottom>
                                        {stuff.name}
                                    </Typography>
                                    <Typography color="text.primary" sx={{ pb: 2 }}>
                                        {stuff.occupation}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Card>
    );
}

export default Stuff;
