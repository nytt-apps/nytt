import logo from './32x32.png';
import { invoke } from '@tauri-apps/api/tauri'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function Nav() {
    const fetchWeather = async () => {
        let foo:string = await invoke('fetch_api', { 
            url: `https://api.openweathermap.org/data/2.5/weather?q=campinas&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        })
        return JSON.parse(foo)
    }

    const { isLoading, error, data } = useQuery('weather', fetchWeather, { refetchInterval: 300000 })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
        <nav className="bg-nytt h-24 flex items-center gap-3">
            <div className="w-3/5 h-full">
                <img className="h-full" src={logo}/>
            </div>
            <div className="w-2/5 flex justify-between">
                <p className="text-2xl text-cyan-50">{data.main.temp} °C in Campinas</p>
                <p className="text-2xl text-cyan-50 mr-5"> {new Date().toLocaleDateString()}</p>
            </div>
        </nav>
    );
}
