
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Footer from "./_components/footer";
import AdminScrollytelling from "./_components/admin-scrollytelling";
import TeacherParentScrollytelling from "./_components/teacher-parent-scrollytelling";
import StudentScrollytelling from "./_components/student-scrollytelling";

export default function Home() {
	return (
		<main className="relative w-full">
			<Navbar />
			<Hero />
			<AdminScrollytelling />
			<TeacherParentScrollytelling />
			<StudentScrollytelling />
			<Footer />
		</main>
	);
}
