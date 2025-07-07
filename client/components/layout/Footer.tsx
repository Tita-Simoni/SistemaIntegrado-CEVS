export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  GOV
                </span>
              </div>
              <span className="font-semibold text-foreground">GOVRS</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-accent rounded flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">
                  CEVS
                </span>
              </div>
              <span className="font-semibold text-foreground">CEVS</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>© 2024 Governo do Estado do Rio Grande do Sul</p>
            <p>Centro Estadual de Vigilância em Saúde</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
