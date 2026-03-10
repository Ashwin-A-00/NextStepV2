import { useState } from "react";
import { Info, Calendar, UserCheck, X, Video, MessageCircle, Clock, CheckCircle2 } from "lucide-react";

type MentorSupportPageProps = {
    onBack: () => void;
};

const mentors = [
    {
        name: "Ananya Sharma",
        title: "M.Tech, IIT Madras • 5+ yrs in Full-Stack",
        time: "Today • 7:30 PM - 8:00 PM",
        speciality: "Frontend, React, UI reviews",
        avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Annie&backgroundColor=ffdfbf",
    },
    {
        name: "Rahul Verma",
        title: "SDE II, Product MNC • B.Tech CSE",
        time: "Tomorrow • 6:00 PM - 6:45 PM",
        speciality: "System design for beginners, backend",
        avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Felix&backgroundColor=c0aede",
    },
    {
        name: "Sneha Kulkarni",
        title: "Data Scientist • MS in Data Science",
        time: "Sat • 11:00 AM - 11:45 AM",
        speciality: "Machine learning projects, Python",
        avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Sophie&backgroundColor=ffdfbf",
    },
    {
        name: "Arjun Mehta",
        title: "Lead Engineer • 8+ yrs experience",
        time: "Sun • 5:00 PM - 5:45 PM",
        speciality: "Project planning, architecture",
        avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Oliver&backgroundColor=b6e3f4",
    },
    {
        name: "Priya Nair",
        title: "Career Coach • Ex-FAANG",
        time: "Mon • 8:00 PM - 8:30 PM",
        speciality: "Career guidance, interview prep",
        avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Jasmine&backgroundColor=f4d0ba",
    },
];

export const MentorSupportPage = ({ onBack }: MentorSupportPageProps) => {
    const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);

    // Booking flow states
    const [modalStep, setModalStep] = useState<'select' | 'schedule' | 'confirm'>('select');
    const [sessionType, setSessionType] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');

    // Track bookings by mentor name
    const [bookings, setBookings] = useState<Record<string, { type: string, date: string, time: string }>>({});

    const availableDates = ["Tomorrow, Oct 25", "Thursday, Oct 26", "Friday, Oct 27"];
    const availableTimes = ["5:00 PM", "6:30 PM", "8:00 PM", "9:00 PM"];

    const handleCloseModal = () => {
        setSelectedMentor(null);
        setTimeout(() => {
            setModalStep('select');
            setSessionType('');
            setSelectedDate('');
            setSelectedTime('');
        }, 300);
    };

    const handleConfirmBooking = () => {
        if (!selectedMentor || !selectedDate || !selectedTime) return;

        setBookings(prev => ({
            ...prev,
            [selectedMentor.name]: {
                type: sessionType,
                date: selectedDate,
                time: selectedTime
            }
        }));
        setModalStep('confirm');
    };

    return (
        <section className="relative min-h-screen bg-black text-white">
            {/* Top Header */}
            <div className="flex items-start gap-4 px-6 md:px-10 pt-8 pb-6 border-b border-white/10 w-full max-w-6xl mx-auto">
                <div className="p-3 border border-white/10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <UserCheck size={24} className="text-white/80" />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-xl md:text-2xl font-light tracking-tight">Mentor Support</h1>
                        <Info size={16} className="text-white/40" />
                    </div>
                    <p className="text-sm text-white/60 max-w-xl">
                        Book intensive 1:1 sessions, clear doubts with experts, and receive direct, personalized guidance on your portfolio and projects.
                    </p>
                </div>
            </div>



            <div className="px-6 md:px-10 pb-10 w-full max-w-6xl mx-auto">
                <div className="border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-light tracking-tight mb-2">
                        Top Experts for You
                    </h2>
                    <p className="text-sm text-white/60 mb-8 border-b border-white/10 pb-6">
                        Curated mentors who directly match your target role and current skill gaps.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentors.map((mentor, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedMentor(mentor)}
                                className="group border border-white/15 bg-white/5 backdrop-blur-md rounded-xl p-6 hover:bg-white/10 hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 flex-shrink-0 border border-white/20 group-hover:border-accent/50 transition-colors">
                                                <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">
                                                    {mentor.name}
                                                </h3>
                                                <p className="text-xs text-white/50 mt-1">{mentor.title.split('•')[0]}</p>
                                                <p className="text-xs text-white/50">{mentor.title.split('•')[1]}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-5">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Speciality</span>
                                            <p className="text-sm text-white/80">{mentor.speciality}</p>
                                        </div>
                                    </div>
                                </div>

                                {bookings[mentor.name] ? (
                                    <div className="pt-4 border-t border-white/10 mt-4">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-lg">
                                            <CheckCircle2 size={14} className="text-accent" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Upcoming Session</span>
                                                <span className="text-xs text-white/80">{bookings[mentor.name].date} at {bookings[mentor.name].time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-white/70">
                                            <Calendar size={14} className="text-accent/80" />
                                            <span className="text-xs font-medium">{mentor.time.split('•')[0]}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-accent/90">{mentor.time.split('•')[1]}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedMentor && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
                    <div
                        className={`w-full max-w-lg bg-[#0a101f] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl relative transition-all duration-300 ${modalStep === 'confirm' ? 'text-center' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/40 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
                            onClick={handleCloseModal}
                        >
                            <X size={20} />
                        </button>

                        {modalStep === 'select' && (
                            <>
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex-shrink-0 border-2 border-accent">
                                        <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mb-1">
                                            Book a Session
                                        </p>
                                        <h3 className="text-2xl font-light text-white mb-1">
                                            {selectedMentor.name.split(' ')[0]}
                                        </h3>
                                        <p className="text-xs text-white/60">
                                            {selectedMentor.speciality}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <button
                                        className="flex items-start gap-4 p-5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-accent/50 transition-all text-left group"
                                        onClick={() => {
                                            setSessionType('Mock Interview');
                                            setModalStep('schedule');
                                        }}
                                    >
                                        <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/20 text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-black transition-all">
                                            <Video size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[15px] font-semibold text-white mb-1 group-hover:text-accent transition-colors">Mock Interview</h4>
                                            <p className="text-xs text-white/60 leading-relaxed">
                                                Practice your technical or behavioral interview skills. Receive detailed, constructive feedback on your performance.
                                            </p>
                                        </div>
                                    </button>

                                    <button
                                        className="flex items-start gap-4 p-5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all text-left group"
                                        onClick={() => {
                                            setSessionType('1:1 Doubt Clearance');
                                            setModalStep('schedule');
                                        }}
                                    >
                                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                            <MessageCircle size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[15px] font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">1:1 Doubt Clearance</h4>
                                            <p className="text-xs text-white/60 leading-relaxed">
                                                Stuck on a concept or project bug? Hop on a quick call to get tailored help and overcome your blockers directly.
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </>
                        )}

                        {modalStep === 'schedule' && (
                            <>
                                <div className="mb-6">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold mb-1">
                                        Select Time
                                    </p>
                                    <h3 className="text-xl font-light text-white mb-1">
                                        Schedule {sessionType}
                                    </h3>
                                    <p className="text-sm text-white/60">
                                        with {selectedMentor.name}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-xs font-semibold text-white/70 uppercase tracking-widest block mb-3">Available Dates</label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableDates.map(date => (
                                                <button
                                                    key={date}
                                                    onClick={() => setSelectedDate(date)}
                                                    className={`px-4 py-2 rounded-xl text-sm border font-medium transition-all ${selectedDate === date ? 'bg-accent text-black border-accent' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'}`}
                                                >
                                                    {date}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={selectedDate ? "opacity-100 transition-opacity duration-300" : "opacity-30 pointer-events-none transition-opacity duration-300"}>
                                        <label className="text-xs font-semibold text-white/70 uppercase tracking-widest block mb-3">Available Times</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {availableTimes.map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm border font-medium transition-all ${selectedTime === time ? 'bg-accent/20 text-accent border-accent/50' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'}`}
                                                >
                                                    <Clock size={14} className={selectedTime === time ? "text-accent" : "text-white/40"} />
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                                        <button
                                            onClick={() => setModalStep('select')}
                                            className="px-5 py-2.5 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleConfirmBooking}
                                            disabled={!selectedDate || !selectedTime}
                                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${(!selectedDate || !selectedTime) ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-accent text-black hover:bg-accent/90 shadow-[0_0_15px_rgba(255,255,255,0.2)]'}`}
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {modalStep === 'confirm' && (
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-2xl font-light text-white mb-2">Booking Confirmed!</h3>
                                <p className="text-white/70 mb-6 text-center max-w-xs">
                                    Your {sessionType} with {selectedMentor.name} is scheduled for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
                                </p>
                                <button
                                    onClick={handleCloseModal}
                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium text-white transition-all"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
