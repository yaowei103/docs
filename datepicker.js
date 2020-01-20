import React from 'react';
import styles from './style.scss';
import moment from 'moment';

class Datepicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentYear:moment().year(),
            currentMonth:moment().month()+1,
            currentDate:moment().date(),
            currentDay:moment().day(),
            currentMonthDays:new Array(42)
        };
    }
    componentDidMount(){
        // const currentMonth = moment().month()+1;
        // const currentMonthFirstDay = moment(``);
        this.calculateCurrentMonth();
    }
    calculateCurrentMonth(){
        const {currentDate, currentDay} = this.state;
        const currentDateIndex = currentDate + (currentDay - currentDate % 7)-1;
        const currentMonthDays = new Array(42);
        let cloneIndexDate = moment(this.returnCurrentDate().format('YYYY-MM-DD'), 'YYYY-MM-DD');
        currentMonthDays[currentDateIndex] = currentDate;
        for(let i=currentDateIndex+1;i<42;i++){
            const afterAddDate = cloneIndexDate.add(1, 'days').date();
            currentMonthDays[i] = afterAddDate;
            // console.log('index-value:', i, afterAddDate)
        }
        cloneIndexDate = moment(this.returnCurrentDate().format('YYYY-MM-DD'), 'YYYY-MM-DD');
        for(let j=currentDateIndex-1;j>=0;j--){
            const afterSubDate = cloneIndexDate.subtract(1, 'days').date();
            currentMonthDays[j] = afterSubDate
            // console.log('index-value:', j, afterSubDate)
        }
        this.setState({
            currentMonthDays
        },()=>{
            console.log(this.state.currentMonthDays);
        })
    }
    returnCurrentDate(){
        const {currentYear, currentMonth, currentDate} = this.state;
        return moment(`${currentYear}-${currentMonth}-${currentDate}`, 'YYYY-MM-DD');
    }
    renderCurrentMonth(){
        const {currentMonthDays} = this.state;
        return currentMonthDays.map((item, index) => {
            return (
                <li key={index}>{item}</li>
            );
        })
    }
    render(){
        return (
            <div className={styles.datepicker}>
                <div className={styles.input}>
                    <input value="111" placeholder="请选择日期" onChange={(event)=>{console.log(event)}} />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.leftBtn}>
                        <i>&lt;&lt;</i>&nbsp;
                        <i>&lt;</i>
                    </div>
                    <div className={styles.centerShow}>
                        <strong>{this.returnCurrentDate().format('YYYY年MM月DD日')}</strong>
                    </div>
                    <div className={styles.rightBtn}>
                        <i>&gt;</i>&nbsp;
                        <i>&gt;&gt;</i>
                    </div>
                </div>
                <ul className={styles.select}>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                    <li>日</li>
                    {
                        this.renderCurrentMonth()
                    }
                </ul>
                <div className={styles.footer}></div>
            </div>
        );
    }
};

export default Datepicker;
