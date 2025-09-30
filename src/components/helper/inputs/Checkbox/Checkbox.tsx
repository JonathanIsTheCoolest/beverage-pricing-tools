export const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (checked: boolean) => void }) => {
  return (
    <span>
      <button name={label} onClick={() => onChange(!checked)}>
        {checked ? '✓' : '✗'}
      </button>
    </span>
  );
};