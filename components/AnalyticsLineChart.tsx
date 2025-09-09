import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Generate mock data for the last 30 days
const salesData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
        name: `${date.getMonth() + 1}/${date.getDate()}`,
        sales: Math.floor(Math.random() * 2000) + 500,
    };
});

const AnalyticsLineChart: React.FC = () => {
    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <LineChart
                    data={salesData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 0.5)" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                         contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            border: '1px solid #ccc',
                            borderRadius: '0.5rem'
                        }}
                    />
                    <Legend iconSize={10} />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} dot={{r: 2}} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsLineChart;
