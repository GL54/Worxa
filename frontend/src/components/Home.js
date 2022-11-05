import naruto from "./icon/HappyChar.jpg";

let Home = () => {
  return (
    <div>
      <main class="bg-fuchsia-100 h-[42.4rem] flex">
        <div class="main h-full py-56 pl-8">
          <div class="text-8xl">Worxa!</div>
          <p class="pl-3 py-2">Right where Hiring and Wroking is Simplified.</p>
        </div>
        <div class="flex items-center">
          <img src={naruto} alt="HappyLogo" class="h-52"></img>
        </div>
      </main>
    </div>
  );
};
export default Home;
