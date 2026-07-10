<template>
  <footer class="bg-[#1f6f5f] text-[#eeeeee]">
    <div
      class="mx-auto grid max-w-6xl gap-9 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:py-12"
    >
      <div>
        <p class="text-xl font-bold tracking-wide">FT CARDS</p>
        <p class="mt-3 max-w-xs text-sm leading-6 text-[#eeeeee]/80">
          Baxtli kunlaringiz uchun nafis taklifnomalar.
        </p>
      </div>

      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.14em]">Biz bilan bog'laning</p>
        <div class="mt-4 flex flex-col items-start gap-3 text-sm text-[#eeeeee]/80">
          <a
            href="https://t.me/Ft_Cards_Fergana"
            target="_blank"
            rel="noopener noreferrer"
            class="transition hover:text-[#6fcf97]"
          >
            Telegram: @Ft_Cards_Fergana
          </a>
          <a
            href="https://www.instagram.com/ft_cards_fergana_taklifnomalar/"
            target="_blank"
            rel="noopener noreferrer"
            class="transition hover:text-[#6fcf97]"
          >
            Instagram: @ft_cards_fergana_taklifnomalar
          </a>
          <a
            href="tel:+998904214141"
            class="transition hover:text-[#6fcf97]"
          >
            Telefon: +998 90 421 41 41
          </a>
          <a
            href="tel:+998978144141"
            class="transition hover:text-[#6fcf97]"
          >
            +998 97 814 41 41
          </a>
        </div>
      </div>

      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.14em]">Ma'lumot</p>
        <div class="mt-4 space-y-3 text-sm leading-6 text-[#eeeeee]/80">
          <p>Farg'ona, O'zbekiston</p>
          <p>Du–Yak 9:00–18:00</p>
        </div>
      </div>
    </div>

    <div class="border-t border-[#6fcf97]/30 px-5 py-5 text-center text-xs text-[#eeeeee]/70 sm:px-8">
      © {{ new Date().getFullYear() }} FT CARDS. Barcha huquqlar himoyalangan.
    </div>
  </footer>
</template>
