export default function TransformDate(date){
    const SelectedDate = new window.Date(date)
    const Year = SelectedDate.getFullYear()
    const Mounth = (SelectedDate.getMonth() + 1).toString().padStart(2 , '0')
    const Day = SelectedDate.getDate().toString().padStart(2 , '0')


    return `${Year}-${Mounth}-${Day}`
}