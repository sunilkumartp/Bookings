'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface OccupancyData {
  date: string
  occupancy: number
}

export function OccupancyChart() {
  const [data, setData] = useState<OccupancyData[]>([])

  useEffect(() => {
    fetch('/api/occupancy')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching occupancy data:', error))
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Occupancy for Next 7 Days</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="occupancy" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

