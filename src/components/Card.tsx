export default function Card({article}) {
    console.log(article)
    return (
        <div className="bg-slate-600 h-full flex gap-3 pb-10">
            <div className="w-3/5 h-full flex justify-center items-center">
                <img className="object-cover h-full" src={article.urlToImage}></img>
            </div>
            <div className="w-2/5 h-full flex justify-center items-center flex-col">
                <h1 className="text-3xl text-cyan-50 font-bold m-2">{article.title}</h1>
                <p className="text-xl text-cyan-50"> {article.description} </p>
            </div>
        </div>
    );
}
