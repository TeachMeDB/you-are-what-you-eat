import { FC, ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { FilteringStyledOptions } from '@mui/styled-engine';

import {People, ScheduleEntity } from '@/models/schedule'
import { compareAsc,getDay } from 'date-fns';
import { ScheduleSend } from '@mui/icons-material';




export const segs=['s','sf','st','sff','e','ef','et','eff','n','nf','nt','nff','l'];
export const times=['06:00:00','07:30:00','09:00:00','10:30:00','12:00:00','13:30:00','15:00:00','16:30:00','18:00:00','19:30:00','21:00:00','22:30:00','23:59:59']
export const days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
export const colors=['red','blue','purple','yellow','green'];
export const date_times=times.map((value:string)=>new Date("2001-01-01 "+value))


const ScheduleForm = styled(Box)(
    ({ }) => `
    .schedule {
    margin:1rem .5rem;
    background-color: #fff;
    border-radius: .2rem;
    padding: .5rem;
    display: grid;
    width: auto;
    grid-gap: 0;
        overflow: hidden;
    border: 0px solid #dfe3e6;
    justify-self: center;
    /*   grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); */
    grid-template-columns: [time] 100px
        [sunday] minmax(auto, auto) 
        [monday] minmax(auto, auto) 
        [tuesday] minmax(auto, auto) 
        [wednesday] minmax(auto, auto) 
        [thursday]minmax(auto, auto) 
        [friday] minmax(auto, auto) 
        [saturday] minmax(auto, auto) ;
    grid-template-rows: [header] auto
        [s] 40px
        [sf] 40px
        [st] 40px
        [sff] 40px
        [e] 40px
        [ef] 40px
        [et] 40px
        [eff] 40px
        [n] 40px
        [nf] 40px
        [nt] 40px
        [nff] 40px;
        [l] 0px;
    }

    .schedule_header{
    display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0.5rem 1rem;
        border: 1px solid #dfe3e6;
    /* 	background-color: white;	 */
    color: #17394d;
        text-align: center;
    }

    .schedule_time{
    position: relative;
        padding: 0.5rem 0.25rem;
        border: 1px solid #dfe3e6;
    color: #17394d;
        font-weight: bold;
        text-align: center;
    }

    .grid{
        border:1px solid #dfe3e6; 
    }

    .schedule-item{
    background-color: white;
    border-radius: .25rem;
    /*   box-shadow: 0 1px 0 rgba(9,45,66,.25); */
    padding: .5rem;
    margin: .25em;
    }

    .bg-red{
    background: #eb5a46b8;
    color: #8e3224;
    border: 2px solid #b95344;
    }

    .bg-blue{
    background: #08b7d29e;
    color: #104a53;
    border: 2px solid #157786;
    }

    .bg-purple{
    background: #a251bfb8;
    color: #633673;
    border: 2px solid #a24cc1;
    }

    .bg-yellow{
    background: #f0d50794;
    color: #847927;
    border: 2px solid #e1c700;
    }

    .bg-green{
    background: #61bd4fa1;
    color: #3c882d;
    border: 2px solid #61bd4f;
    }

    .schedule-sunday { grid-column: sunday / span 1; }
    .schedule-monday { grid-column: monday / span 1; }
    .schedule-tuesday { grid-column: tuesday / span 1; }
    .schedule-wednesday { grid-column: wednesday / span 1; }
    .schedule-thursday { grid-column: thursday / span 1; }
    .schedule-friday { grid-column: friday / span 1; }
    .schedule-saturday { grid-column: saturday / span 1; }

    .schedule-row-from-sunday { grid-column: sunday / span 7;}
    /* .schedule-row-to-saturday { grid-column-end: saturday; } */

    .time-from-s { grid-row-start: s; }
    .time-from-sf { grid-row-start: sf; }
    .time-from-st { grid-row-start: st; }
    .time-from-sff { grid-row-start: sff; }

    .time-from-e { grid-row-start: e; }
    .time-from-ef { grid-row-start: ef; }
    .time-from-et { grid-row-start: et; }
    .time-from-eff { grid-row-start: eff; }

    .time-from-n { grid-row-start: n; }
    .time-from-nf { grid-row-start: nf; }
    .time-from-nt { grid-row-start: nt; }
    .time-from-nff { grid-row-start: nff; }

    .time-from-l { grid-row-start: l; }


    /*  End */
    .time-to-s { grid-row-end: s; }
    .time-to-sf { grid-row-end: sf; }
    .time-to-st { grid-row-end: st; }
    .time-to-sff { grid-row-end: sff; }

    .time-to-e { grid-row-end: e; }
    .time-to-ef { grid-row-end: ef; }
    .time-to-et { grid-row-end: et; }
    .time-to-eff { grid-row-end: eff; }

    .time-to-n { grid-row-end: n; }
    .time-to-nf { grid-row-end: nf; }
    .time-to-nt { grid-row-end: nt; }
    .time-to-nff { grid-row-end: nff; }

    .time-to-l { grid-row-end: l; }

    .ds{
    display: none;
    }
    @media (max-width: 800px) {
    .schedule{
        display: inline-grid;
        overflow: hidden;
        grid-template-columns: [time] 40px
            [sunday] minmax(auto, 125px) 
            [monday] minmax(auto, 125px) 
            [tuesday] minmax(auto, 125px) 
            [wednesday] minmax(auto, 125px) 
            [thursday]minmax(auto, 125px) 
            [friday] minmax(auto, 125px) 
            [saturday] minmax(auto, 125px) ;
        grid-template-rows: [header] 40px
            [s] 40px 59px
            [sf] 40px 59px
            [st] 40px 59px
            [sff] 40px 59px
            [e] 40px 59px
            [ef] 40px 59px
            [et] 40px 59px
            [eff] 40px 59px
            [n] 40px 59px
            [nf] 40px 59px
            [nt] 40px 59px
            [nff] 40px 59px;
            [l] 0px 59px;

        }
    
        .schedule_time {
        -ms-transform: rotate(-90deg) translate(-100px);
        -webkit-transform: rotate(-90deg) translate(-100px);
        transform: rotate(-90deg) translate(-100px);
        -webkit-transform-origin: left 50%;
        -ms-transform-origin: left 50%;
        transform-origin: left top;
        width:90px;
        }
        
        .dl {
        display:none;
        }
    
        .ds{
        display: block;
        }
    /*     .schedule-item {
        height: 70px;
        } */
    
    .grid-last{
        height:98px;
    }
}
`
);


function Schedule({ className,children,schedules }:{className?: string,children?: ReactNode,schedules:ScheduleEntity[]}){

    const SegmentToTime=(segment:string)=>{

        for(let i=0;i<segs.length;i++){
            if(segment===segs[i]){
                return times[i];
            }
        }
    }


    const FromTimeToSegment=(time:string)=>{

        let date_input:string[]=time.split(' ');
        if(date_input.length==2){
            time=date_input[1];
        }

        const this_time=new Date("2001-01-01 "+time)

        if(compareAsc(this_time,date_times[0])<0){
            return segs[0];
        }

        for(let i=0;i<segs.length-1;i++){
            if(compareAsc(date_times[i],this_time)<=0 && compareAsc(this_time,date_times[i+1])<0){
                return segs[i];
            }
        }

        if(compareAsc(date_times[segs.length-1],this_time)<=0){
            return segs[segs.length-1];
        }

    }

    const ToTimeToSegment=(time:string)=>{

        let date_input:string[]=time.split(' ');
        if(date_input.length==2){
            time=date_input[1];
        }

        const this_time=new Date("2001-01-01 "+time)

        if(compareAsc(this_time,date_times[0])<0){
            return segs[0];
        }

        for(let i=0;i<segs.length-2;i++){
            if(compareAsc(date_times[i],this_time)<0 && compareAsc(this_time,date_times[i+1])<=0){
                return segs[i+1];
            }
        }

        if(compareAsc(date_times[segs.length-1],this_time)<=0){
            return segs[segs.length-1];
        }

    }


    return (
        <ScheduleForm>
            <div className="schedule">
                <div className="schedule_header">
                    <span className="dl">时间</span>
                    <span className="ds">班</span></div>
                {/* <!-- week--> */}
                <div className="schedule_header schedule-sunday">
                    <span className="dl">星期日</span>
                    <span className="ds">日</span>
                </div>
                <div className="schedule_header schedule-monday">
                    <span className="dl">星期一</span>
                    <span className="ds">一</span></div>
                <div className="schedule_header schedule-tuesday">
                    <span className="dl">星期二</span>
                    <span className="ds">二</span></div>
                <div className="schedule_header schedule-wednesday">
                    <span className="dl">星期三</span>
                    <span className="ds">三</span></div>
                <div className="schedule_header schedule-thursday">
                    <span className="dl">星期四</span>
                    <span className="ds">四</span></div>
                <div className="schedule_header schedule-friday">
                    <span className="dl">星期五</span>
                    <span className="ds">五</span></div>
                <div className="schedule_header schedule-saturday">
                    <span className="dl">星期六</span>
                    <span className="ds">六</span></div>

                {/* <!-- Time--> */}
                <div className="schedule_time time-from-s">06:00-07:30</div>
                <div className="schedule_time time-from-sf">07:30-09:00</div>
                <div className="schedule_time time-from-st">09:00-10:30</div>
                <div className="schedule_time time-from-sff">10:30-12:00</div>

                <div className="schedule_time time-from-e">12:00-13:30</div>
                <div className="schedule_time time-from-ef">13:30-15:00</div>
                <div className="schedule_time time-from-et">15:00-16:30</div>
                <div className="schedule_time time-from-eff">16:30-18:00</div>

                <div className="schedule_time time-from-n">18:00-19:30</div>
                <div className="schedule_time time-from-nf">19:30-21:00</div>
                <div className="schedule_time time-from-nt">21:00-22:30</div>
                <div className="schedule_time time-from-nff">22:30-23:59</div>


                {/* <!--  Grid Rows--> */}
                <div className="grid time-from-s time-to-sf schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid time-from-sf time-to-st schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid time-from-st time-to-sff schedule-row-from-sunday schedule-row-to-saturday"></div>

                <div className="grid time-from-sff time-to-e schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid time-from-e time-to-ef schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid time-from-ef time-to-et schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid time-from-et time-to-eff schedule-row-from-sunday schedule-row-to-saturday"></div>

                <div className="grid time-from-eff time-to-n schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid time-from-n time-to-nf schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid time-from-nf time-to-nt schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid time-from-nt time-to-nff schedule-row-from-sunday schedule-row-to-saturday"></div>
                <div className="grid grid-last time-from-nff time-to-nff schedule-row-from-sunday schedule-row-to-saturday"></div>
                {/* <!--   ./Grid Rows--> */}

                <div className="grid schedule-sunday time-from-s time-to-nff"></div>
                <div className="grid grid-last schedule-sunday time-from-nff time-to-nff"></div>
                <div className="grid schedule-monday time-from-s time-to-nff"></div>
                <div className="grid grid-last schedule-monday time-from-nff time-to-nff"></div>

                <div className="grid schedule-tuesday time-from-s time-to-nff"></div>
                <div className="grid grid-last schedule-tuesday time-from-nff time-to-nff"></div>

                <div className="grid schedule-wednesday time-from-s time-to-nff"></div>
                <div className="grid grid-last schedule-wednesday time-from-nff time-to-nff"></div>

                <div className="grid schedule-thursday time-from-s time-to-nff"></div>
                <div className="grid grid-last schedule-thursday time-from-nff time-to-nff"></div>

                <div className="grid schedule-friday time-from-s time-to-nff"></div>
                <div className="grid grid-last schedule-friday time-from-nff time-to-nff"></div>

                <div className="grid schedule-saturday time-from-s time-to-nff"></div>
                <div className="grid grid-last schedule-saturday time-from-nff time-to-nff"></div>


                {/* <!-- Schedule Items -->  */}

                {
                    schedules.map((schedule:ScheduleEntity,index:number)=>{

                        let day:number=getDay(new Date(schedule.time_end));

                        return (<div key={schedule.plan_id}
                            className={
                                "schedule-item schedule-"+days[day]+" "+
                                "time-from-"+FromTimeToSegment(schedule.time_start)+" "+
                                "time-to-"+ToTimeToSegment(schedule.time_end)+" "+ 
                                "bg-"+colors[index%5]}>
                                    {
                                        schedule.peoples.map((people:People,idx:number)=>{

                                            return (
                                                people.name+'\n'
                                            )
                                        })
                                    }
                                </div>)
                    })
                }

                {/* <div className="schedule-item schedule-sunday time-from-sf time-to-sff bg-red">Event for sunday</div>

                <div className="schedule-item schedule-sunday time-from-st time-to-eff bg-blue">Event for sunday2</div>
                <div className="schedule-item schedule-sunday time-from-nt time-to-nff bg-yellow">Event x S</div>
                <div className="schedule-item schedule-monday time-from-s time-to-sff bg-green">Event for monday</div>
                <div className="schedule-item schedule-monday time-from-eff time-to-nt bg-purple">Event for monday</div>
                
                
                <div className="schedule-item schedule-wednesday time-from-n time-to-nff bg-blue">Event for Wednesday</div> 
                <div className="schedule-item schedule-wednesday time-from-sf time-to-st bg-purple">Event x W</div> 
                
                <div className="schedule-item schedule-thursday time-from-st time-to-e bg-yellow">Event for thursday</div>
                <div className="schedule-item schedule-thursday time-from-eff time-to-n bg-green">Event x th</div>
                
                <div className="schedule-item schedule-friday time-from-e time-to-eff bg-purple">Event for friday</div>
                
                <div className="schedule-item schedule-saturday time-from-n time-to-l bg-red">Event for saturday</div> */}

                <Container maxWidth="lg">{children}</Container>
            </div>
        </ScheduleForm>

    );
};

Schedule.propTypes = {
    children: PropTypes.node
};

export default Schedule;
