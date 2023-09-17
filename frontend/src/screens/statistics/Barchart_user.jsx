import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { loadUserStats } from '../../redux/action';
import Card from './Card';





const BarchartUser = () => {

    const dispatch = useDispatch();
    const [userGraphs1, setUserGraphs1] = useState([])
    const [userGraphs2, setUserGraphs2] = useState([])

    const [userCard1, setUserCard1] = useState([])
    const [userCard2, setUserCard2] = useState([])

    const { userStats } = useSelector((state) => state.data);


    useEffect(() => {
        dispatch(loadUserStats());
    }, [])

    useEffect(() => {
        if (userStats && userStats?.graphs) {
            setUserGraphs1(userStats?.graphs.length > 0 ? userStats?.graphs[0].data : [])
            setUserGraphs2(userStats?.graphs.length > 0 ? userStats?.graphs[1].data : [])
        }

        if (userStats && userStats?.cards) {
            setUserCard1(userStats?.cards.length > 0 ? userStats?.cards : [])
            // setUserCard2(userStats?.cards.length > 0 ? userStats?.cards[1].data : [])
        }


    }, [userStats])


    return (
        <>
            <h1 style={{ fontWeight: 'bold', fontSize: "20px", padding: "30px" }}>Quiz Insights</h1>

            <div style={{ display: "flex" }} >
                <div>
                    <BarChart width={500} height={300} data={userGraphs1}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#bb86fc" />
                    </BarChart>
                    <h1 style={{ fontWeight: 'bold', fontSize: "15px", textAlign: "center" }}>Percentage of marks scored Vs Quiz</h1>

                </div>

                <div>
                    <BarChart width={500} height={300} data={userGraphs2}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#bb86fc" />
                    </BarChart>
                    <h1 style={{ fontWeight: 'bold', fontSize: "15px", textAlign: "center" }}>No.of attemps to qualify Vs Quiz</h1>

                </div>
            </div>

            <div style={{ padding: "30px" }}>
                <h1 style={{ fontWeight: 'bold', fontSize: "20px" }}>Quiz OverView</h1>


                <div style={{ display: "flex", padding: "20px" }}>
                    {userCard1.map((card, index) => (
                        <Card key={index} data={card} />
                    ))}
                </div>
            </div>
        </>

    );
};

export default BarchartUser;