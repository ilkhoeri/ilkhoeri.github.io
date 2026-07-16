# Public Repositories Catalog

## Deskripsi

Aplikasi ini adalah **kumpulan data repositori publik** dari user GitHub yang berisi informasi lengkap tentang semua proyek yang telah dipublikasikan. Data ini berfungsi sebagai katalog terpusat untuk manajemen portfolio, tracking, dan referensi proyek.

## URL & Endpoint

Aplikasi berjalan menggunakan framework `next.js@latest` dan me-render sebagian besar halaman dengan statis. Sebagian halaman me-render konten `markdown` (`mdx`) menggunakan `contentlayer`.

## Penggunaan

### Untuk Portfolio

Data ini dapat digunakan untuk membuat:

- Portfolio website yang dinamis
- GitHub profile showcase
- Project catalog dengan filtering

### Untuk Analytics

- Tracking repository growth
- Analysis pola development
- Monitoring engagement metrics

### Untuk Documentation

- Auto-generate project documentation
- Maintain centralized catalog
- Version history tracking

## Format File

File disimpan dalam format **JSON** dengan struktur array yang berisi object repository.

```json
[
  {
    "id": 123456,
    "name": "repository-name",
    "full_name": "username/repository-name",
    "description": "Deskripsi repository"
    // ... metadata lainnya
  }
]
```

## Lisensi

Repositori yang terdaftar menggunakan berbagai lisensi:

- **MIT License**: Dominan di mayoritas proyek
- **Other Licenses**: Beberapa proyek dengan lisensi custom

## Notes

- Data ini di-fetch dari **GitHub API** secara statis
- Fork repositories tetap didokumentasikan untuk referensi
- Repositori archived masih tersimpan untuk historical records
- Status `updated_at` / `Last Updated` menunjukkan kapan metadata terakhir diupdate

---

**Last Updated**: 2026-07-16
