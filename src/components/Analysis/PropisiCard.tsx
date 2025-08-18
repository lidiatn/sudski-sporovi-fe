
type Props = {
  naziv: string;
  tekstOdluke: string;
  objasnjenje: string;
  onClick: () => void;
  selected: boolean;
};

export const PropisiCard = ({ naziv, tekstOdluke, objasnjenje, onClick, selected }: Props) => (

      <div className={`p-4 rounded-2xl transition ${
          selected ? 'bg-[var(--card-selected)] shadow-[var(--card-shadow)]' : 'p-4 bg-white shadow-[var(--card-shadow)] rounded-2xl hover:bg-[var(--card-hover)]'
      }`}   style={{ boxShadow: '0 0 10px rgba(62, 60, 107)' }}
           onClick={onClick}>
        <h3 className="font-bold text-lg text-black-600">{naziv}</h3>
        <p className="text-sm text-gray-700">
          <strong>Referenca odluke na članak:</strong> {tekstOdluke}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Objašnjenje:</strong> {objasnjenje}
        </p>
      </div>
)
;