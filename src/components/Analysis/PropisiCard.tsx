
type Props = {
  naziv: string;
  tekstOdluke: string;
  objasnjenje: string;
  onClick: () => void;
  selected: boolean;
  highlightEnabled: boolean;
};

export const PropisiCard = ({ naziv, tekstOdluke, objasnjenje, onClick, selected, highlightEnabled }: Props) => (

      <div className={`p-4 rounded-2xl transition ${
          selected ? 'bg-[var(--card-selected)] shadow-[var(--card-shadow)]' : `p-4 bg-white shadow-[var(--card-shadow)] rounded-2xl ${highlightEnabled?"hover:bg-[var(--card-hover)":""}]`
      }`}   style={{ boxShadow: '0 0 10px rgba(62, 60, 107)' }}
           onClick={onClick}>
        <h3 className="font-bold text-sm lg:text-lg text-black-600 font-['Arial', 'sans-serif'] mt-2">{naziv}</h3>
        <p className="text-xs md:text-sm font-['Arial', 'sans-serif'] text-gray-700">
          <strong>Referenca odluke na članak:</strong> {tekstOdluke}
        </p>
        <p className="text-xs md:text-sm font-['Arial', 'sans-serif'] text-gray-700 mt-2">
          <strong>Objašnjenje:</strong> {objasnjenje}
        </p>
      </div>
)
;