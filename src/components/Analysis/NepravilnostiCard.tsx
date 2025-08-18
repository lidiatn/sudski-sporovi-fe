type Props = {
  nepravilnost: string;
  clanak: string;
  objasnjenje: string;
};

export const NepravilnostCard = ({ nepravilnost, clanak, objasnjenje }: Props) => (
    <div className="p-4 bg-white rounded shadow"
         style={{ boxShadow: '0 0 10px rgba(62, 60, 107)'}}>
      <h3 className="font-bold text-lg text-black-600">{nepravilnost}</h3>
      <p className="text-sm text-gray-700">
        <strong>Članak:</strong> {clanak}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        <strong>Objašnjenje:</strong> {objasnjenje}
      </p>
    </div>
);