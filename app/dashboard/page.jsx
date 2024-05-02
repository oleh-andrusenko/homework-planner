import FocusTimer from "@/components/FocusTimer"
import NewTask from "@/components/NewTask"
import SearchBar from "@/components/SearchBar"
import Summary from "@/components/Summary"

function DashboardPage() {
  return (
    <div className='flex justify-between flex-wrap gap-1 gap-y-4  relative'>
      <Summary />
      <FocusTimer />
      <NewTask />
    </div>
  )
}

export default DashboardPage
