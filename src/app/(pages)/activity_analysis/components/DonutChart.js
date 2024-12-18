"use client"
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function DonutChart({calendar, categories, events}){
    const chartRef = useRef(null)



    useEffect(() => {
        const labels = [];
        const data = [];
        let index = 0;

        const filteredEvents = events.filter((event) => (event.calendar == calendar));

        filteredEvents.forEach((event) => {
            const startTime = new Date(event.start);
            const endTime = new Date(event.end);

            // Calculate duration in hours
            const duration = (endTime - startTime);

            // Add duration to each category the event belongs to
        });

        categories.map((category) => {
            labels.push(category.name)

            let filteredByCategory = filteredEvents.filter((event) =>
                event.categories.includes(category.id)
            );
            filteredByCategory.forEach((event) => {
                const startTime = new Date(event.start);
                const endTime = new Date(event.end);
    
                // Calculate duration in hours
                const duration = (endTime - startTime);
    
                // Add duration to each category the event belongs to
                data[index] = 0 + duration;
            });
            index += 1;
            
        })

        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "doughnut",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Work Logged in Last 4 Days",
                            data: data,
                            backgroundColor: [
                                "rgb(255, 99, 132, 0.2)",
                                "rgb(255, 159, 64, 0.2)",
                                "rgb(255, 205, 86, 0.2)",
                                "rgb(75, 192, 192, 0.2)",
                                "rgb(54, 162, 235, 0.2)",
                                "rgb(153, 102, 255, 0.2)",
                                "rgb(201, 203, 207, 0.2)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(255, 205, 86)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)",
                                "rgb(153, 102, 255)",
                                "rgb(201, 203, 207)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false, // Prevent enforcing aspect ratio
                    plugins: {
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const ms = context.raw; // The raw data in milliseconds
                              const hours = Math.floor(ms / (1000 * 60 * 60));
                              const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
                              const totalminutes = Math.floor((totalTime % 60000) / 1000);
                              const percentage = minutes/(totalTime / (1000 * 60)) * 100;
                              return `${context.label}: ${hours}h ${minutes}m `; // Format the tooltip
                            },
                          },
                        },
                    }
                }
            });

            chartRef.current.chart = newChart
        }
    }, [calendar])

    return <canvas style={{
        width: "90%",
        objectFit: "fill"
    }} ref={chartRef}/>

}