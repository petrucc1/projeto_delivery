"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-auto">
      <div
        className="max-w-6xl mx-auto container-padding"
        style={{ paddingTop: "30px", paddingBottom: "20px" }}
      >
        <p className="text-gray text-sm flex items-center justify-center">
          <span style={{ marginRight: "8px" }}>Feito com</span>
          <span className="text-red-500 text-lg animate-pulse">♥</span>
          <span style={{ marginLeft: "8px" }}>por Sarah Petrucci</span>
        </p>
      </div>
    </footer>
  );
}
