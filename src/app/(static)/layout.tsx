import Navbar from "../_components/navbar";
import Footer from "../_components/footer";

export default function StaticLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-1 pt-24">{children}</main>
			<Footer />
		</div>
	);
}

