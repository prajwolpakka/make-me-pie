function PieChartLegend({ data }) {
  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: item.color,
              marginRight: "5px",
            }}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default PieChartLegend;
