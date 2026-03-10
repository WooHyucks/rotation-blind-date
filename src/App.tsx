import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  User, 
  LayoutDashboard, 
  Smartphone, 
  CreditCard, 
  Users, 
  Coffee,
  CheckCircle2,
  Plus,
  X,
  ChevronRight,
  Heart,
  Music,
  Clock,
  Store,
  MessageCircle,
  Loader2
} from 'lucide-react';

const App = () => {
  // --- 상태 관리 ---
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'guest' | 'admin'>('guest');
  const [isInstagramLinked, setIsInstagramLinked] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [gender, setGender] = useState<'M' | 'F'>('M');

  useEffect(() => {
    // 실제 데이터가 없으므로 마운트 후 아주 짧은 지연시간 뒤에 로딩 해제
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // 이미지 업로드 시뮬레이션
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && images.length < 4) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const isFormValid = isInstagramLinked && images.length >= 2;

  return (
    <div className="min-h-screen bg-[#FFE5E1] text-stone-800 font-sans selection:bg-rose-200 overflow-x-hidden relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#FFE5E1] flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-rose-200 blur-3xl opacity-40 animate-pulse" />
              <div className="relative p-8 bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] shadow-[0_20px_50px_rgba(251,113,133,0.1)]">
                <Loader2 size={40} className="text-rose-500 animate-spin-slow" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black text-stone-900 tracking-tighter mb-1">LOADING</h2>
              <p className="text-[10px] text-rose-900/40 font-black uppercase tracking-[0.3em]">ROTATION DEMO</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 부드러운 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-pink-100/50 blur-[100px] rounded-full" />
        <div className="absolute bottom-[0%] right-[-5%] w-[50%] h-[50%] bg-orange-50/50 blur-[120px] rounded-full" />
      </div>

      {/* 사장님 전용 홍보 메세지 (최상단으로 이동) */}
      <section className="relative z-30 pt-16 pb-8 px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-white/90 backdrop-blur-xl border border-white rounded-[3rem] p-10 text-center shadow-[0_30px_70px_rgba(251,113,133,0.12)] relative group gpu-accel"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          <p className="text-stone-800 text-lg sm:text-xl leading-snug font-black tracking-tight mb-8">
            "카페 사장님은 공간의 가치만 더해 주세요.<br className="hidden sm:block" />
            세련된 로테이션 시스템과 확실한 수익 모델,<br className="hidden sm:block" />
            <span className="text-rose-500">영업 데모 페이지</span>를 통해 지금 바로 파트너가 되어 보세요."
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <span className="text-[10px] text-stone-400 font-black tracking-[0.2em] flex items-center gap-1.5 px-4 py-2 bg-stone-50 rounded-full border border-stone-100 hover:text-rose-500 transition-colors"><Heart size={12} /> 브랜드 매칭</span>
            <span className="text-[10px] text-stone-400 font-black tracking-[0.2em] flex items-center gap-1.5 px-4 py-2 bg-stone-50 rounded-full border border-stone-100 hover:text-rose-500 transition-colors"><Store size={12} /> 직접 수익 창출</span>
            <span className="text-[10px] text-stone-400 font-black tracking-[0.2em] flex items-center gap-1.5 px-4 py-2 bg-stone-50 rounded-full border border-stone-100 hover:text-rose-500 transition-colors"><Music size={12} /> 무드 컨트롤</span>
          </div>

          <motion.a
            href="https://open.kakao.com/o/saxefSji"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#FEE500] text-[#000000] rounded-[2rem] font-black text-sm shadow-[0_10px_25px_rgba(254,229,0,0.2)] hover:bg-[#FDD800] transition-all"
          >
            <MessageCircle size={20} fill="currentColor" />
            <span>데모 버전 문의하기 (오픈카톡)</span>
          </motion.a>
        </motion.div>
      </section>

      {/* 뷰 전환 탭 (위로 이동) */}
      <div className="relative z-20 flex justify-center mb-8 px-4 gpu-accel">
        <div className="w-full max-w-sm bg-white/60 backdrop-blur-md border border-white/50 p-1.5 rounded-[2.5rem] flex gap-1 shadow-[0_10px_30px_rgba(251,113,133,0.05)]">
          <button 
            onClick={() => setActiveTab('guest')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[2rem] transition-all duration-300 ${activeTab === 'guest' ? 'bg-rose-500 text-white shadow-lg font-black' : 'text-stone-400 font-bold hover:text-rose-400'}`}
          >
            <Smartphone size={18} />
            <span className="text-sm tracking-wide">손님용 화면</span>
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[2rem] transition-all duration-300 ${activeTab === 'admin' ? 'bg-rose-500 text-white shadow-lg font-black' : 'text-stone-400 font-bold hover:text-rose-400'}`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm tracking-wide">관리자 보드</span>
          </button>
        </div>
      </div>

      {/* 헤더 섹션 (아래로 이동) - 간략화 */}
      <header className="relative z-20 px-10 pb-16 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-black tracking-tighter text-stone-900 leading-none">
            ROTATION <span className="text-rose-500">DEMO</span>
          </h1>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-4 rounded-full opacity-30" />
        </motion.div>
      </header>

      <main className="relative z-20 max-w-6xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'guest' ? (
            <motion.div 
              key="guest"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="flex justify-center"
            >
              {/* 모바일 화면 프레임 */}
              <div className="relative w-full max-w-[390px] min-h-[780px] bg-white/80 backdrop-blur-md rounded-[3.5rem] border-[12px] border-white shadow-[0_30px_80px_rgba(251,113,133,0.15)] overflow-hidden flex flex-col gpu-accel">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-white rounded-b-3xl z-50 shadow-sm flex items-center justify-center" />
                
                {/* 모바일 내부 컨텐츠 */}
                <div className="flex-1 overflow-y-auto bg-stone-50/30 px-7 pt-16 pb-12 scrollbar-hide">
                  <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100/50 border border-rose-200/50 rounded-full mb-4">
                      <Heart size={12} className="text-rose-500" />
                      <span className="text-[10px] text-rose-900 font-black tracking-widest uppercase">Love in Rotation</span>
                    </div>
                    <h2 className="text-2xl font-black text-stone-900 mb-2">프라이빗 로테이션</h2>
                    <div className="flex justify-center gap-3 text-stone-400 text-[11px] font-bold mt-4">
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-rose-400" /> 매주 금 19:30</span>
                      <span className="w-[1px] h-3 bg-stone-200 self-center" />
                      <span className="flex items-center gap-1.5"><CreditCard size={14} className="text-rose-400" /> 참가비 10,000원</span>
                    </div>
                  </div>

                  <div className="space-y-8">

                    {/* 기본 정보 폼 */}
                    <div className="space-y-6 text-left">
                      <div className="space-y-2">
                        <label className="text-[11px] text-rose-900/60 font-black uppercase tracking-widest ml-1 leading-none">기본 정보</label>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="이름 (실명 필수)"
                            className="w-full bg-white border border-stone-100 px-5 py-4 rounded-2xl focus:border-rose-400 focus:ring-4 focus:ring-rose-400/5 transition-all outline-none placeholder:text-stone-300 tracking-wide"
                            style={{ fontSize: '16px' }}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              placeholder="MBTI"
                              className="w-full bg-white border border-stone-100 px-5 py-4 rounded-2xl focus:border-rose-400 outline-none text-center font-black uppercase tracking-widest shadow-sm"
                              style={{ fontSize: '16px' }}
                            />
                            <div className="flex bg-stone-100/50 rounded-2xl p-1.5 h-[54px] shadow-sm">
                              <button 
                                onClick={() => setGender('M')}
                                className={`flex-1 flex items-center justify-center text-xs font-black rounded-xl transition-all ${gender === 'M' ? 'bg-white text-blue-500 shadow-sm' : 'text-stone-400'}`}
                              >남성</button>
                              <button 
                                onClick={() => setGender('F')}
                                className={`flex-1 flex items-center justify-center text-xs font-black rounded-xl transition-all ${gender === 'F' ? 'bg-white text-red-500 shadow-sm' : 'text-stone-400'}`}
                              >여성</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] text-rose-900/60 font-black uppercase tracking-widest ml-1 leading-none">나를 표현하는 한 줄</label>
                        <textarea 
                          placeholder="본인의 매력을 짧게 소개해 주세요."
                          className="w-full bg-white border border-stone-100 px-5 py-4 rounded-2xl focus:border-rose-400 outline-none h-28 resize-none leading-relaxed shadow-sm tracking-wide"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                    </div>

                    {/* 프로필 이미지 업로드 */}
                    <div className="text-left space-y-3">
                       <div className="flex justify-between items-baseline px-1">
                        <label className="text-[11px] text-rose-900/60 font-black uppercase tracking-widest leading-none">프로필 사진</label>
                        <span className={`text-xs font-black italic tracking-widest ${images.length >= 2 ? 'text-rose-500' : 'text-stone-300 animate-pulse'}`}>
                          {images.length}/4 (최소 2장)
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-stone-100 shadow-md group">
                            <img src={img} alt="preview" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                            <button 
                              onClick={() => removeImage(idx)}
                              className="absolute top-1.5 right-1.5 bg-white/90 p-1.5 rounded-full shadow-sm"
                            >
                              <X size={12} className="text-rose-500" />
                            </button>
                          </div>
                        ))}
                        {images.length < 4 && (
                          <label className="aspect-square rounded-2xl bg-[#F6F1ED] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50 hover:border-rose-300 transition-all group">
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            <Plus size={24} className="text-stone-300 group-hover:text-rose-400 transition-colors" />
                            <span className="text-[9px] text-stone-300 font-bold uppercase mt-1">Add</span>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 인스타그램 연동 */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsInstagramLinked(!isInstagramLinked)}
                      className={`w-full py-5 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center justify-center gap-2 group relative overflow-hidden ${
                        isInstagramLinked 
                        ? 'bg-white border-transparent shadow-md' 
                        : 'bg-white border-stone-100 text-stone-400 hover:border-rose-200'
                      }`}
                    >
                      {isInstagramLinked && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#f9ce34]/10 via-[#ee2a7b]/10 to-[#6228d7]/10 pointer-events-none" />
                      )}
                      <div className="flex items-center gap-2.5 relative z-10">
                        <Instagram 
                          size={24} 
                          className={isInstagramLinked 
                            ? 'text-[#E1306C] drop-shadow-[0_0_8px_rgba(225,48,108,0.3)]' 
                            : 'text-stone-300 group-hover:text-stone-400'
                          } 
                        />
                        <span className={`text-base font-black tracking-tight ${isInstagramLinked ? 'text-stone-800' : 'text-stone-400'}`}>
                          {isInstagramLinked ? '인스타그램 연동 완료' : '인스타그램 연동하기'}
                        </span>
                        {isInstagramLinked && <CheckCircle2 size={16} className="text-[#E1306C]" />}
                      </div>
                      <p className="text-[10px] text-stone-400 font-medium relative z-10">연동 시 매칭 성공률이 70% 상승합니다.</p>
                    </motion.button>

                    {/* 결제 및 신청 버튼 */}
                    <motion.button
                      disabled={!isFormValid}
                      whileHover={isFormValid ? { scale: 1.02, y: -4 } : {}}
                      whileTap={isFormValid ? { scale: 0.98 } : {}}
                      className={`w-full py-5 rounded-[2rem] font-black text-base mt-6 transition-all duration-500 flex items-center justify-center gap-3 tracking-widest shadow-[0_10px_30px_rgba(251,113,133,0.1)] ${
                        isFormValid 
                        ? 'bg-rose-500 text-white shadow-rose-200 hover:shadow-rose-300 hover:bg-rose-600' 
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-100'
                      }`}
                    >
                      <span>참가비 결제 및 신청완료</span>
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* 상단 지표 카드 (모바일 최적화) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { label: '이번 주 신청자', val: '14명', sub: '남여 7:7 성비 최적화', icon: Users, color: 'text-rose-500', bg: 'bg-rose-500' },
                  { label: '누적 예약금', val: '14만 ₩', sub: '미납자 1명 (입금대기)', icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-500' },
                  { label: '예상 음료 매출', val: '+7만 ₩', sub: '방문객 +28명 예상', icon: Coffee, color: 'text-blue-500', bg: 'bg-blue-500' }
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="group bg-white/90 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_15px_35px_rgba(251,113,133,0.06)] hover:shadow-[0_25px_50px_rgba(251,113,133,0.12)] transition-all cursor-default"
                  >
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className={`p-4 rounded-2xl bg-stone-50 border border-stone-100 group-hover:bg-white transition-colors`}>
                        <card.icon size={22} className={card.color} />
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-stone-50 border border-stone-100 rounded-full text-[9px] font-black text-stone-400 tracking-tighter">
                        <div className={`w-1 h-1 rounded-full ${card.bg} animate-pulse`} />
                        LIVE
                      </div>
                    </div>
                    <div className="relative z-10">
                      <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-1">{card.label}</p>
                      <h3 className="text-3xl font-black text-stone-900 tracking-tighter mb-1.5">{card.val}</h3>
                      <p className="text-[10px] text-stone-400 font-bold">{card.sub}</p>
                    </div>
                    
                    {/* 카드 배경 장식 (모바일에서 깔끔하게) */}
                    <div className="absolute right-[-2.5rem] bottom-[-2.5rem] opacity-[0.03] transition-transform duration-1000 group-hover:scale-125 group-hover:-rotate-45 pointer-events-none">
                      <card.icon size={120} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 신청자 현황 테이블 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md border border-white/50 rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(251,113,133,0.1)] gpu-accel"
              >
                <div className="px-10 py-8 border-b border-rose-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/20">
                      <Store size={24} className="text-rose-500" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-black text-stone-900 tracking-tight">영업 매장 현황</h3>
                      <p className="text-[10px] text-rose-900/40 font-bold uppercase tracking-widest mt-1">Daily Live Transaction</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-2 px-5 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100 text-[11px] font-black tracking-widest shadow-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      남성 07
                    </span>
                    <span className="flex items-center gap-2 px-5 py-2 bg-red-50 text-red-600 rounded-full border border-red-100 text-[11px] font-black tracking-widest shadow-sm">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      여성 07
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {/* 데스크톱 테이블 뷰 (md 이상) */}
                  <table className="w-full text-left hidden md:table">
                    <thead>
                      <tr className="text-rose-900/40 text-[10px] uppercase tracking-[0.3em] bg-stone-50/30">
                        <th className="px-10 py-6 font-black">신청자 명</th>
                        <th className="px-10 py-6 font-black text-center">성별</th>
                        <th className="px-10 py-6 font-black">인스타 연동</th>
                        <th className="px-10 py-6 font-black text-center">결제 상태</th>
                        <th className="px-10 py-6 font-black text-right">상세 정보</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-rose-50 text-stone-600">
                      {[
                        { name: '김*혁', gender: '남', insta: '인증 완료', status: '결제완료' },
                        { name: '이*정', gender: '여', insta: '인증 완료', status: '결제완료' },
                        { name: '박*준', gender: '남', insta: '대기 중', status: '입금대기' },
                        { name: '최*희', gender: '여', insta: '인증 완료', status: '결제완료' },
                        { name: '정*우', gender: '남', insta: '인증 완료', status: '결제완료' },
                      ].map((item, idx) => (
                        <tr key={idx} className="group hover:bg-rose-50/20 transition-all cursor-pointer">
                          <td className="px-10 py-7">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center border border-stone-100 shadow-inner group-hover:bg-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <User size={18} className="text-stone-400" />
                              </div>
                              <span className="font-bold text-stone-900 tracking-widest">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-10 py-7 text-center">
                            <span className={`text-[11px] font-black tracking-widest ${item.gender === '남' ? 'text-blue-500' : 'text-red-500'}`}>{item.gender}</span>
                          </td>
                          <td className="px-10 py-7">
                            <div className={`flex items-center gap-2 ${item.gender === '남' ? 'text-blue-500/70' : 'text-red-500/70'}`}>
                              <Instagram size={14} />
                              <span className="text-[11px] font-black tracking-widest">{item.insta}</span>
                            </div>
                          </td>
                          <td className="px-10 py-7 text-center">
                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest border ${
                              item.status === '결제완료' 
                              ? (item.gender === '남' ? 'bg-blue-500 text-white border-blue-500 shadow-sm' : 'bg-red-500 text-white border-red-500 shadow-sm')
                              : 'bg-transparent text-stone-300 border-stone-100'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-10 py-7 text-right">
                            <button className="p-2 text-stone-200 hover:text-rose-500 transition-colors transform hover:translate-x-1">
                              <ChevronRight size={24} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* 모바일 카드 뷰 (md 미만) - 더 예쁘고 프리미엄하게 */}
                  <div className="md:hidden pt-2 divide-y divide-stone-50">
                    {[
                      { name: '김*혁', gender: '남', insta: '인증 완료', status: '결제완료' },
                      { name: '이*정', gender: '여', insta: '인증 완료', status: '결제완료' },
                      { name: '박*준', gender: '남', insta: '대기 중', status: '입금대기' },
                      { name: '최*희', gender: '여', insta: '인증 완료', status: '결제완료' },
                      { name: '정*우', gender: '남', insta: '인증 완료', status: '결제완료' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-8 space-y-6 active:bg-stone-50/50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-[1.25rem] bg-stone-100 flex items-center justify-center border border-stone-200 shadow-sm ${item.gender === '남' ? 'bg-blue-50/50 text-blue-400' : 'bg-red-50/50 text-red-400'}`}>
                              <User size={20} />
                            </div>
                            <div>
                              <span className="font-black text-stone-800 text-lg tracking-widest block">{item.name}</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full border ${item.gender === '남' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-red-50 text-red-500 border-red-100'}`}>
                                  {item.gender}성 회원
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100 text-stone-300">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className={`rounded-2xl p-4 border transition-colors ${item.gender === '남' ? 'bg-blue-50/20 border-blue-100/30' : 'bg-red-50/20 border-red-100/30'}`}>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Instagram size={12} className="text-stone-400" />
                              <p className="text-[9px] text-stone-400 font-black uppercase tracking-widest leading-none">인스타 연동</p>
                            </div>
                            <div className={`text-[11px] font-black tracking-tight ${item.insta === '인증 완료' ? (item.gender === '남' ? 'text-blue-500' : 'text-red-500') : 'text-stone-300'}`}>
                              {item.insta}
                            </div>
                          </div>
                          <div className={`rounded-2xl p-4 border transition-colors ${item.gender === '남' ? 'bg-blue-50/20 border-blue-100/30' : 'bg-red-50/20 border-red-100/30'}`}>
                            <div className="flex items-center gap-1.5 mb-2">
                              <CreditCard size={12} className="text-stone-400" />
                              <p className="text-[9px] text-stone-400 font-black uppercase tracking-widest leading-none">결제 상태</p>
                            </div>
                            <div className={`flex items-center gap-1.5 ${item.status === '결제완료' ? (item.gender === '남' ? 'text-blue-500' : 'text-red-500') : 'text-stone-300'}`}>
                              <span className="text-[11px] font-black tracking-tight">{item.status}</span>
                              {item.status === '결제완료' && <CheckCircle2 size={10} />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 간소화된 푸터 */}
      <footer className="relative z-20 py-12 flex flex-col items-center">
        <p className="text-stone-400 text-[10px] font-bold tracking-[0.2em] opacity-30">
          © 2026 ROTATION DATING SYSTEM. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default App;
