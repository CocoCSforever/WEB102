import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css'
import TarotCard from './components/TarotCard';
import TarotDetail from './components/TarotDetail';

function App() {
  
  const tarotCards = [
    { id: 0, name: "The Fool", image: "src/images/the-fool.png", meaning: "New beginnings, adventure, spontaneity.",
      detailedMeaning: "This card encourages you to embrace change and trust that the universe will provide. It symbolizes innocence, optimism, and stepping forward without fear of the unknown. While it can be a symbol of freedom and new opportunities, The Fool also warns against naivety and rushing into things without thinking them through.",
      useCases: [
        "Starting a new job or career path.",
        "Beginning a creative project.",
        "A major life transition like moving to a new city."
      ] },
    { id: 1, name: "The Magician", image: "src/images/the-magician.png", meaning: "Manifestation, resourcefulness, power.",
      detailedMeaning: "The Magician represents the power to create and manifest your goals. It emphasizes personal will, skill, and focus. This card asks you to make use of your inner resources and talents to achieve success. It also reminds you to be conscious of your power, as what you create can be both positive or negative depending on your intentions.",
      useCases: [
        "Using your skills to complete a challenging task.",
        "Starting a business or project using your unique abilities.",
        "Manifesting personal goals with focused intention."
      ] },
    { id: 2, name: "The High Priestess", image: "src/images/the-high-priestess.png", meaning: "Intuition, wisdom, mystery.",
      detailedMeaning: "This card invites you to trust your intuition and connect with your subconscious mind. The High Priestess indicates that you may need to take a step back and reflect on a situation to gain deeper insight. She suggests that answers are hidden, and you must trust in your own instincts and inner voice to uncover them.",
      useCases: [
        "Seeking answers through meditation or introspection.",
        "Listening to your gut feeling when making a decision.",
        "Trusting that not everything can be immediately understood; sometimes patience is required."
      ] },
    { id: 3, name: "The Empress", image: "src/images/the-empress.png", meaning: "Nurturing, abundance, femininity.",
      detailedMeaning: "This card signifies creativity in its most abundant form. It represents nurturing energy and the creation of something meaningful. The Empress encourages you to take care of yourself and your environment, to embrace your creativity, and to allow abundance to flow into your life.",
      useCases: [
        "Giving birth to a new idea or project.",
        "Caring for others or nurturing relationships.",
        "Creating beauty or art that brings harmony and joy."
      ] },
    { id: 4, name: "The Emperor", image: "src/images/the-emperor.png", meaning: "Authority, structure, discipline.",
      detailedMeaning: "The Emperor emphasizes the importance of setting boundaries, creating structure, and taking control of your destiny. This card encourages leadership and decision-making based on logic, stability, and authority. It also suggests that you may need to establish order in a situation that is chaotic or undefined.",
      useCases: [
        "Taking charge of a team or situation.",
        "Setting clear boundaries in relationships or projects.",
        "Making disciplined decisions for long-term stability."
      ] },
    { id: 5, name: "The Hierophant", image: "src/images/the-hierophant.png", meaning: "Tradition, spiritual guidance, conformity.",
      detailedMeaning: "The Hierophant represents spiritual wisdom and guidance from a higher source. It signifies tradition, conformity, and the search for truth and meaning. This card suggests that you may need to seek advice from a mentor or spiritual leader to gain clarity and understanding.",
      useCases: [
        "Seeking advice from a teacher or mentor.",
        "Exploring traditional spiritual practices or beliefs.",
        "Conforming to social norms or expectations."
      ] },
    { id: 6, name: "The Lovers", image: "src/images/the-lovers.png", meaning: "Love, harmony, relationships.",
      detailedMeaning: "The Lovers card represents love, relationships, and choices. It signifies union, harmony, and alignment with your values and beliefs. This card suggests that you may need to make an important decision related to love or relationships, and that you should follow your heart and intuition.",
      useCases: [
        "Making a decision about a romantic relationship.",
        "Choosing between two paths or options.",
        "Seeking harmony and balance in your relationships."
      ] },
    { id: 7, name: "The Chariot", image: "src/images/the-chariot.png", meaning: "Determination, victory, willpower.",
      detailedMeaning: "The Chariot represents determination, willpower, and victory. It signifies overcoming obstacles and moving forward with confidence and strength. This card suggests that you may need to take control of a situation and steer it in the direction you desire, using your inner strength and resolve.",
      useCases: [
        "Overcoming challenges or obstacles.",
        "Taking control of a situation or project.",
        "Moving forward with confidence and determination."
      ] },
    { id: 8, name: "Strength", image: "src/images/strength.png", meaning: "Courage, patience, inner strength.",
      detailedMeaning: "The Strength card represents courage, patience, and inner strength. It signifies the ability to overcome challenges with grace and compassion. This card suggests that you may need to find the courage to face your fears and challenges, and to trust in your inner strength and resilience.",
      useCases: [
        "Facing your fears with courage and compassion.",
        "Practicing patience and resilience in difficult situations.",
        "Drawing on your inner strength to overcome challenges."
      ] },
    { id: 9, name: "The Hermit", image: "src/images/the-hermit.png", meaning: "Soul-searching, introspection, guidance.",
      detailedMeaning: "The Hermit represents introspection, solitude, and inner guidance. It signifies the need to take time for reflection and soul-searching to find answers within yourself. This card suggests that you may need to seek solitude and quiet contemplation to gain clarity and insight.",
      useCases: [
        "Taking time for self-reflection and introspection.",
        "Seeking guidance from within through meditation or spiritual practices.",
        "Finding answers by looking inward and listening to your inner voice."
      ] }
  ];

  const TarotDetailWrapper = ({tarotCards}) => {
    console.log("called");
    const { id } = useParams();
    console.log("TarotDetailWrapper called with id:", id);
    const card = tarotCards.find(card => card.id === parseInt(id));
    console.log("Found card:", card);
    return <TarotDetail card={card} />;
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Tarot Insights Board</h1>
          
        </header>

        <Routes>
          {/* Main route showing tarot cards */}
          <Route path="/" element={
            <div className="tarot-card-container">
              {tarotCards.map((card) => (
                <TarotCard key={card.id} card={card} />
              ))}
            </div>
          } />

          <Route path="/:id" element={<TarotDetailWrapper tarotCards={tarotCards}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
