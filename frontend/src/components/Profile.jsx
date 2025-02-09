import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 3;

function Profile() {
	const [user, setUser] = useState(null);
	const [auctions, setAuctions] = useState([]);
	const [bids, setBids] = useState([]);
	const [wonAuctions, setWonAuctions] = useState([]);
	const [currentPageAuctions, setCurrentPageAuctions] = useState(1);
	const [currentPageBids, setCurrentPageBids] = useState(1);
	const [currentPageWon, setCurrentPageWon] = useState(1);
	const [totalPagesAuctions, setTotalPagesAuctions] = useState(1);
	const [totalPagesBids, setTotalPagesBids] = useState(1);
	const [totalPagesWon, setTotalPagesWon] = useState(1);

	useEffect(() => {
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("jwt="))
			?.split("=")[1];

		if (!token) return;

		const fetchData = async (url, setter, totalSetter, key) => {
			try {
				const response = await axios.get(url, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const data = response?.data;

				if (!data || !data[key]) {
					console.error(`Invalid response from ${url}:`, response);
					return;
				}

				setter(data[key]);
				totalSetter(Math.ceil(data[key].length / ITEMS_PER_PAGE));
			} catch (error) {
				console.error(`Error fetching data from ${url}:`, error);
			}
		};

		fetchData("https://fsd-capstone.onrender.com/api/users/profile", setUser, () => {}, "");
		fetchData("https://fsd-capstone.onrender.com/api/auctions/user", setAuctions, setTotalPagesAuctions, "auctionItems");
		fetchData("https://fsd-capstone.onrender.com/api/bids/user", setBids, setTotalPagesBids, "bids");
		fetchData("https://fsd-capstone.onrender.com/api/auctions/won", setWonAuctions, setTotalPagesWon, "wonAuctions");
	}, []);

	const handlePageChange = (page, type) => {
		if (page < 1) return;
		if (type === "auctions" && page <= totalPagesAuctions) {
			setCurrentPageAuctions(page);
		} else if (type === "bids" && page <= totalPagesBids) {
			setCurrentPageBids(page);
		} else if (type === "won" && page <= totalPagesWon) {
			setCurrentPageWon(page);
		}
	};

	const paginate = (items, currentPage) => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return items.slice(start, start + ITEMS_PER_PAGE);
	};

	if (!user) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-900">
				<div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen px-4 py-12 text-gray-300 bg-gray-900">
			<div className="max-w-5xl mx-auto">
				<div className="p-6 bg-gray-800 rounded-lg shadow-xl">
					<h2 className="mb-6 text-3xl font-extrabold text-white">Profile</h2>
					<div className="p-4 mb-6 bg-gray-700 rounded-lg">
						<p>
							<span className="font-semibold text-purple-400">Username:</span> {user.username}
						</p>
						<p>
							<span className="font-semibold text-purple-400">Email:</span> {user.email}
						</p>
					</div>

					<h2 className="text-2xl font-bold text-green-400">Your Auctions</h2>
					{paginate(auctions, currentPageAuctions).map((auction) => (
						<div key={auction._id} className="p-4 my-2 bg-gray-700 rounded">
							<h3 className="text-xl font-semibold">{auction.title}</h3>
							<p>{auction.description}</p>
							<Link to={`/auction/${auction._id}`} className="text-blue-400">View Auction</Link>
						</div>
					))}
					<button onClick={() => handlePageChange(currentPageAuctions - 1, "auctions")}>Prev</button>
					<span>{currentPageAuctions}</span>
					<button onClick={() => handlePageChange(currentPageAuctions + 1, "auctions")}>Next</button>

					<h2 className="mt-8 text-2xl font-bold text-blue-400">Your Bids</h2>
					{paginate(bids, currentPageBids).map((bid) => (
						<div key={bid._id} className="p-4 my-2 bg-gray-700 rounded">
							<h3 className="text-xl font-semibold">{bid.auctionItem?.title || "N/A"}</h3>
							<p>Bid Amount: ${bid.bidAmount}</p>
							<Link to={`/auction/${bid.auctionItem?._id}`} className="text-blue-400">View Auction</Link>
						</div>
					))}
					<button onClick={() => handlePageChange(currentPageBids - 1, "bids")}>Prev</button>
					<span>{currentPageBids}</span>
					<button onClick={() => handlePageChange(currentPageBids + 1, "bids")}>Next</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;
