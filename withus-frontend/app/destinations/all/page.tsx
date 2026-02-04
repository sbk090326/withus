import { RealTimeRanking } from './components/RealTimeRanking';
import { RisingDestinations } from './components/RisingDestinations';
import { SeasonalDestinations } from './components/SeasonalDestinations';
import { StyleBasedDestinations } from './components/StyleBasedDestinations';

export default function AllDestinationsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full pt-32 pb-16 px-6 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            🔥 인기 여행지 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">둘러보기</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            지금 가장 핫한 여행지부터 나에게 딱 맞는 여행지까지,<br />
            모든 트렌드를 한눈에 확인하세요
          </p>
        </div>
      </section>

      {/* Real-Time Ranking */}
      <RealTimeRanking />

      {/* Rising Destinations */}
      <RisingDestinations />

      {/* Seasonal Destinations */}
      <SeasonalDestinations />

      {/* Style-Based Destinations */}
      <StyleBasedDestinations />
    </main>
  );
}
