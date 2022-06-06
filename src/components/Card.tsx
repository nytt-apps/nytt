export default function Card({article}) {
    return (
        <div className="bg-ttyy h-full flex gap-3">
            <div className="w-3/5 h-full flex justify-center items-center">
                <img className="object-cover h-full" src={article.urlToImage}></img>
            </div>
            <div className="w-2/5 h-full flex justify-start items-center flex-col pr-12 pt-12">
                <h1 className="text-3xl text-yytt font-bold mb-5 text-left">{article.title}</h1>
                <p className="text-2xl text-cyan-50 text-left"> {article.description} </p>
            </div>
        </div>
    );
}
