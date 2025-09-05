type Props = {
  nepravilnost: string;
  clanak: string;
  objasnjenje: string;
};

export const NepravilnostCard = ({ nepravilnost, clanak, objasnjenje }: Props) => (
    <div className="p-4 bg-white rounded shadow"
         style={{ boxShadow: '0 0 10px rgba(62, 60, 107)'}}>
      <h3 className="font-bold text-base lg:text-lg text-black-600 mt-2">{nepravilnost}</h3>
      <p className="text-xs lg:text-sm text-gray-700 font-['Arial', 'sans-serif']">
        <strong>Članak:</strong> {clanak}
      </p>
      <p className="text-xs lg:text-sm text-gray-700 font-['Arial', 'sans-serif'] mt-2">
        <strong>Objašnjenje:</strong> {objasnjenje}
      </p>
    </div>
);