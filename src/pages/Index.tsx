import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Palette, Menu, X } from "lucide-react";

type PreviewImage = {
  src: string;
  label: string;
  subtitle?: string;
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80&auto=format&fit=crop";

const LOCAL_IMAGES = {
  dashboard: "/images/image-1.png",
  tugas: "/images/image-2.png",
  portfolio: "/images/image-3.png",
  export: "/images/image-4.png",
};

const teacherScreenshots = [
  { img: LOCAL_IMAGES.dashboard, label: "Dashboard Guru" },
  { img: LOCAL_IMAGES.tugas, label: "Manajemen Tugas" },
  { img: LOCAL_IMAGES.portfolio, label: "Portfolio Siswa" },
  { img: LOCAL_IMAGES.export, label: "Export Laporan" },
];

const SectionLabel = ({
  children,
  className = "text-primary bg-primary/10 border-primary/20",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-block text-xs font-semibold tracking-wide uppercase border rounded-full px-4 py-1.5 ${className}`}
  >
    {children}
  </span>
);

const features = [
  {
    accent: "bg-primary",
    title: "Portfolio Digital",
    desc: "Upload dan tampilkan karya senimu — lukisan, ilustrasi, desain grafis, fotografi — dalam galeri yang indah dan profesional.",
  },
  {
    accent: "bg-secondary",
    title: "Manajemen Tugas",
    desc: "Guru membuat tugas, siswa mengumpulkan karya, semua terpusat. Deadline, feedback, dan revisi jadi lebih mudah.",
  },
  {
    accent: "bg-accent",
    title: "Sistem Pencapaian",
    desc: "Raih badges eksklusif setiap mencapai milestone baru. Gamifikasi yang membuat belajar seni makin seru dan memotivasi.",
  },
  {
    accent: "bg-purple",
    title: "Sertifikat Digital",
    desc: "Sertifikat resmi yang bisa diunduh dan dibagikan. Bukti nyata kompetensi seni yang diakui sekolah.",
  },
];

const howItWorks = [
  {
    step: "01",
    color: "from-primary to-pink",
    title: "Daftar & Login",
    desc: "Masuk dengan NIS (siswa) atau NIP (guru). Tanpa email ribet, langsung bisa dipakai.",
  },
  {
    step: "02",
    color: "from-secondary to-blue",
    title: "Upload Karyamu",
    desc: "Foto atau scan karyamu, tambahkan judul dan deskripsi. Portofoliomu siap tampil dalam hitungan menit.",
  },
  {
    step: "03",
    color: "from-accent to-secondary",
    title: "Dapatkan Pengakuan",
    desc: "Guru menilai, kamu dapat feedback langsung. Kumpulkan badges dan sertifikat yang membuktikan kemampuanmu.",
  },
];

const forTeachers = [
  "Buat tugas dengan deskripsi, rubrik, dan deadline",
  "Pantau perkembangan seluruh siswa dalam satu dashboard",
  "Beri nilai dan feedback langsung pada karya",
  "Export laporan penilaian dalam format PDF/Excel",
  "Keluarkan sertifikat resmi untuk siswa berprestasi",
  "Data aman, akses terkelola sesuai kelas",
];

const stats = [
  { value: "100+", label: "Siswa Aktif", color: "text-primary" },
  { value: "50+", label: "Guru Seni", color: "text-secondary" },
  { value: "100+", label: "Karya Diunggah", color: "text-accent" },
  { value: "100+", label: "Sertifikat Diterbitkan", color: "text-purple" },
];

const achievements = [
  { name: "Pelukis Muda", desc: "Upload 5 karya pertama", unlocked: true },
  { name: "Karya Terbaik", desc: "Dapat nilai 90+", unlocked: true },
  { name: "Konsisten", desc: "Upload 7 hari berturut", unlocked: true },
  { name: "Juara Kelas", desc: "Nilai tertinggi di kelas", unlocked: false },
  { name: "Seniman Pro", desc: "50 karya di portfolio", unlocked: false },
  { name: "Maestro", desc: "Selesaikan semua tugas", unlocked: false },
];

const Index = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

  const openPreview = (image: PreviewImage) => setPreviewImage(image);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-card/90 backdrop-blur-xl shadow-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-pink flex items-center justify-center shadow-glow">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gradient">Allboom</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Fitur", "Cara Kerja", "Untuk Guru", "Pencapaian"].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
              Masuk
            </Button>
            <Button variant="gradient" size="sm" onClick={() => navigate("/auth")}>
              Mulai Gratis
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-b border-border px-4 py-4 space-y-3">
            {["Fitur", "Cara Kerja", "Untuk Guru", "Pencapaian"].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/auth")}>
                Masuk
              </Button>
              <Button variant="gradient" size="sm" className="w-full" onClick={() => navigate("/auth")}>
                Mulai Gratis
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 blob blob-animate -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blob blob-animate translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="absolute inset-0 pattern-dots opacity-40" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-0 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <SectionLabel>Platform E-Portfolio Seni untuk Sekolah</SectionLabel>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Tunjukkan{" "}
              <span className="text-gradient">Bakatmu</span>
              <br />
              ke Dunia
            </h1>

            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              Platform e-portfolio seni digital yang menghubungkan siswa dan guru.
              Upload karya, kerjakan tugas, raih badges, dan buktikan kemampuanmu
              lewat sertifikat resmi sekolah.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                variant="gradient"
                size="xl"
                className="shadow-glow"
                onClick={() => navigate("/auth")}
              >
                Mulai Gratis Sekarang
              </Button>
              <Button variant="outline" size="xl" onClick={() => navigate("/auth")}>
                Lihat Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-border/50 aspect-[4/3]">
              <img
                src={HERO_IMAGE}
                alt="Siswa melukis di kelas seni"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl px-4 py-3 shadow-lg border border-border animate-in">
              <p className="text-xl font-display font-bold">100+</p>
              <p className="text-xs text-muted-foreground">Karya Diunggah</p>
            </div>

            <div className="absolute -top-4 -right-4 bg-card rounded-2xl px-4 py-3 shadow-lg border border-border animate-in delay-200">
              <p className="text-sm font-semibold">Juara Kelas</p>
              <p className="text-xs text-muted-foreground">Badge baru diraih</p>
            </div>

            <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-card rounded-2xl px-4 py-3 shadow-lg border border-border animate-in delay-300 text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Nilai Tugas</p>
              <p className="text-3xl font-display font-bold text-gradient leading-none">95</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className={`text-3xl font-display font-bold ${s.color}`}>{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="fitur" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 space-y-3">
            <SectionLabel className="text-secondary bg-secondary/10 border-secondary/20">
              Fitur Unggulan
            </SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
              Semua yang Kamu Butuhkan
              <br />
              <span className="text-gradient">dalam Satu Platform</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dari upload karya hingga sertifikat digital — Allboom menyederhanakan seluruh
              proses pembelajaran seni untuk siswa dan guru.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="card-playful p-6 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-1 w-10 rounded-full ${f.accent} mb-5 group-hover:w-14 transition-all`} />
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO SHOWCASE ── */}
      <section className="py-16 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionLabel>Galeri Portfolio</SectionLabel>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
                Portfolio yang Membuat
                <br />
                <span className="text-gradient">Karyamu Bersinar</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tampilkan karya terbaikmu dalam galeri yang indah. Setiap karya dinilai oleh guru
                dan mendapat feedback langsung. Tidak ada lagi karya yang tersimpan tanpa diakui.
              </p>
              <ul className="space-y-3">
                {[
                  "Upload foto, ilustrasi, desain, atau karya seni apapun",
                  "Tampilkan di galeri personal yang profesional",
                  "Terima nilai dan feedback dari guru secara real-time",
                  "Bagikan portofoliomu lewat link publik",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gradient" size="lg" onClick={() => navigate("/auth")}>
                Buat Portofoliomu
              </Button>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  openPreview({
                    src: LOCAL_IMAGES.portfolio,
                    label: "Halaman Portfolio",
                    subtitle: "Galeri karya siswa dalam satu tampilan",
                  })
                }
                className="group w-full rounded-2xl overflow-hidden shadow-lg border border-border bg-card text-left cursor-zoom-in hover:shadow-xl hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
                  <span className="ml-2 text-xs text-muted-foreground truncate">
                    allboom.inspiralabs.id/portfolio
                  </span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={LOCAL_IMAGES.portfolio}
                    alt="Halaman Portfolio Allboom"
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/15 transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-white bg-foreground/60 px-3 py-1 rounded-full">
                      Klik untuk perbesar
                    </span>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="cara-kerja" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 space-y-3">
            <SectionLabel className="text-accent-foreground bg-accent/20 border-accent/30">
              Mudah Digunakan
            </SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
              Mulai dalam
              <span className="text-gradient"> 3 Langkah Mudah</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tidak perlu tutorial panjang. Allboom dirancang sesederhana mungkin sehingga siswa
              bisa langsung fokus berkarya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-7 left-1/4 right-1/4 h-px border-t-2 border-dashed border-border" />

            {howItWorks.map((step, i) => (
              <div key={i} className="relative text-center space-y-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-lg text-white font-display font-bold text-lg relative z-10`}
                >
                  {step.step}
                </div>
                <div className="card-playful p-6 space-y-2 text-center">
                  <h3 className="font-display font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="gradient" size="xl" className="shadow-glow" onClick={() => navigate("/auth")}>
              Coba Gratis Sekarang
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOR TEACHERS ── */}
      <section id="untuk-guru" className="py-20 lg:py-28 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3">
                {teacherScreenshots.map((screen) => (
                  <button
                    key={screen.label}
                    type="button"
                    onClick={() =>
                      openPreview({
                        src: screen.img,
                        label: screen.label,
                      })
                    }
                    className="group rounded-2xl overflow-hidden shadow-md border border-border bg-card text-left cursor-zoom-in hover:shadow-lg hover:border-primary/30 transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                      <img
                        src={screen.img}
                        alt={screen.label}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/20 transition-colors">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-white bg-foreground/60 px-3 py-1 rounded-full">
                          Klik untuk perbesar
                        </span>
                      </span>
                    </div>
                    <p className="px-3 py-2 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                      {screen.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <SectionLabel className="text-secondary bg-secondary/10 border-secondary/20">
                Untuk Guru Seni
              </SectionLabel>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
                Kelola Kelas Seni
                <br />
                <span className="text-gradient">Tanpa Kerumitan</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Fokus mengajar, bukan administratif. Allboom mengurus semua pencatatan
                karya, penilaian, dan laporan sehingga guru bisa mencurahkan waktu untuk
                yang paling penting: membimbing bakat siswa.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {forTeachers.map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-md transition-shadow text-sm leading-snug"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>

              <Button variant="gradient" size="lg" onClick={() => navigate("/auth")}>
                Daftar sebagai Guru
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="pencapaian" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 space-y-3">
            <SectionLabel className="text-accent-foreground bg-accent/20 border-accent/30">
              Sistem Gamifikasi
            </SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
              Belajar Seni Jadi
              <span className="text-gradient"> Lebih Menyenangkan</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Raih badges, kumpulkan pencapaian, dan buktikan dirimu sebagai seniman terbaik
              di kelasmu. Setiap karya membawamu selangkah lebih dekat ke puncak.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="grid grid-cols-2 gap-3">
              {achievements.slice(0, 4).map((a, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl text-center border transition-all ${
                    a.unlocked
                      ? "bg-card border-border shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-muted/40 border-border/50 opacity-50"
                  }`}
                >
                  <p className="text-xs font-bold">{a.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                  {a.unlocked && (
                    <span className="mt-2 inline-block text-xs text-secondary font-medium bg-secondary/10 rounded-full px-2 py-0.5">
                      Diraih
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary via-pink to-secondary rounded-3xl p-1 shadow-glow">
                <div className="bg-card rounded-[1.25rem] p-6 text-center space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Sertifikat Digital</p>
                  <h3 className="font-display font-bold text-xl text-gradient">Seniman Terbaik</h3>
                  <p className="text-sm text-muted-foreground">Diberikan kepada</p>
                  <p className="font-display font-bold text-lg">Andi Pratama</p>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground">Kelas XI DKV — Semester Genap 2025/2026</p>
                  </div>
                  <p className="text-sm font-semibold text-accent">Nilai 95 / 100</p>
                  <Button variant="gradient" size="sm" className="w-full mt-2">
                    Unduh Sertifikat
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {achievements.slice(2).map((a, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl text-center border transition-all ${
                    a.unlocked
                      ? "bg-card border-border shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-muted/40 border-border/50 opacity-50"
                  }`}
                >
                  <p className="text-xs font-bold">{a.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                  {a.unlocked && (
                    <span className="mt-2 inline-block text-xs text-secondary font-medium bg-secondary/10 rounded-full px-2 py-0.5">
                      Diraih
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-28 bg-card border-t border-border overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/8 blob blob-animate -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/8 blob blob-animate translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            Siap Menampilkan
            <br />
            <span className="text-gradient">Karya Terbaikmu?</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Bergabunglah dengan lebih dari 100 siswa dan 50 guru seni yang sudah
            menggunakan Allboom. Gratis untuk seluruh ekosistem sekolah.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="gradient" size="xl" className="shadow-glow" onClick={() => navigate("/auth")}>
              Daftar Sebagai Siswa
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/auth")}>
              Masuk Sebagai Guru
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Tidak perlu kartu kredit. Gratis untuk semua pengguna.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-background py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-pink flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-gradient">Allboom</span>
              <span className="text-muted-foreground text-sm">— E-Portfolio Seni Digital</span>
            </div>

            <div className="flex items-center gap-6">
              {["Tentang", "Privasi", "Kontak"].map((l) => (
                <a key={l} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l}
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground text-center sm:text-right">
              © 2026 Allboom. Made with ❤️ by{" "}
              <a
                href="https://inspiralabs.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                InspiraLabs
              </a>
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent className="sm:max-w-5xl w-[95vw] p-4 gap-4">
          <DialogHeader>
            <DialogTitle className="font-display">{previewImage?.label}</DialogTitle>
            {previewImage?.subtitle && (
              <DialogDescription>{previewImage.subtitle}</DialogDescription>
            )}
          </DialogHeader>
          <div className="rounded-xl overflow-hidden bg-muted border border-border max-h-[75vh] flex items-center justify-center">
            {previewImage && (
              <img
                src={previewImage.src}
                alt={previewImage.label}
                className="max-h-[75vh] w-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Index;
