export default function CategoryCard({ category }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
            <p className="text-gray-400 text-sm mt-2">ID: {category._id}</p>
        </div>
    );
}