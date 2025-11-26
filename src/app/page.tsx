import StakeholderOpportunities from "./_components/stakeholder-opportunities";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import FloatingDock from "./_components/floating-dock";
import InteractiveArchitecture from "./_components/interactive-architecture";
import OpportunitiesShowcase from "./_components/opportunities-showcase";
import Footer from "./_components/footer";

export default function Home() {
	return (
		<main className="relative w-full overflow-x-hidden">
			<Navbar />
			<Hero />
			{/* <FloatingDock />
			<InteractiveArchitecture />
			<OpportunitiesShowcase />
			<StakeholderOpportunities /> */}
			<Footer />
		</main>
	);
}
