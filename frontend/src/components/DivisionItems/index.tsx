import './styles.css';

interface DivisionItemsProps {
  mainColor: string;
  completed: number;
}

export const DivisionItems = ({ mainColor, completed }: DivisionItemsProps) => {
  return (
    <div className="containerStyles">
      <div
        className="fillerStyles"
        style={{
          backgroundColor: mainColor || '#FB9400',
          width: `${completed}%`,
        }}
      >
        <span
          className="labelStyles"
          style={{ color: 'rgba(0,0,0,0)' }}
        >{`${completed}`}</span>
      </div>
    </div>
  );
};
