import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#4ade80', '#60a5fa', '#a855f7']

export default function ExperienceChart({ candidates }) {
  const experienceData = candidates.reduce((acc, candidate) => {
    acc[candidate.experience] = (acc[candidate.experience] || 0) + 1
    return acc
  }, { Junior: 0, Mid: 0, Senior: 0 })

  const data = Object.entries(experienceData).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <div className="bg-base-200 p-4 rounded-box h-64">
      <h3 className="text-lg font-bold mb-4">Experience Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}