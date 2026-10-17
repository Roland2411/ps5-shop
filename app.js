/**
 * OMNIVERSE — PS5 Comics & Gaming Hub
 * Kinetic Obsidian UX/UI Application Controller
 */

// Web Audio API Synthesizer for Cybernetic UI SFX
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof AudioContext !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playBeep(freq = 600, type = 'sine', duration = 0.08, gain = 0.05) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gainNode.gain.setValueAtTime(gain, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or supported
    }
  }

  playConfirm() {
    if (!this.enabled) return;
    this.playBeep(520, 'triangle', 0.08, 0.06);
    setTimeout(() => this.playBeep(880, 'sine', 0.12, 0.07), 70);
  }

  playChime() {
    if (!this.enabled) return;
    this.playBeep(659, 'sine', 0.1, 0.05);
    setTimeout(() => this.playBeep(987, 'sine', 0.15, 0.06), 90);
    setTimeout(() => this.playBeep(1318, 'sine', 0.2, 0.07), 180);
  }

  playClick() {
    this.playBeep(440, 'triangle', 0.04, 0.03);
  }
}

const sfx = new SoundFX();

// State Management
const state = {
  cart: [
    {
      id: 'neon-ronin',
      title: 'Neon Ronin: Zero Hour Complete',
      type: 'Synergy Pack',
      price: 79.99,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl-rX8iu0ZwhTu595-LjIGnUXLicX5_-uzKlzcxe8eMwNCXitzDmRZTIzY_03onoG2p4Fg9xY_UNYayGr8BEL_SwlYpkgnoPi1OzubOZb6lts8CQAKOqGpdYJKfrke2iJL50OnIIc4TkK6ZHfxAnB5eFJTUKk_WCFBuStg8V5h-Wqn_vjL-4ueZ82v0EKhGxUem1CFCK4OfT4hk-8e3jG6A2Ql4By3SnRWRKIYbRVFaqyZ7W5VL5HY'
    },
    {
      id: 'spiderman-2',
      title: "Marvel's Spider-Man 2",
      type: 'PS5 Digital',
      price: 59.99,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVUxBBpUXrCEw7TWdp3ckJJXtQ8FZDPqTZFyuIEcJ-RLk3WxC2pEw4rluBszEUOqfejJH3jwLe8X0xcaVH4BbJYt5qYe6LioO1vecnDAvY4le_9YnZ3uafusUBd5QMlH-GXqXrl_7kIoI8zUovlGHwDljN88p8u9yca9x60zcWdfmknBdmZV8oMwXVj2n4_QhV-Hl_U3jjw7s8gUM4yCU-1WRhj2t8SFCI3QQsbZ_EM6siMXD8I4Pi'
    },
    {
      id: 'void-genesis',
      title: 'Void Genesis: Dawn Breach #01',
      type: 'Digital Comic',
      price: 3.99,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT04FeQmvUO70RwX-xuclpmF8e2453a7ZYXZGQXKx3Er_iksVKkyxZ9ySE4luv3OZpWLAewcpwUmYtv5H65cRZUvAfze5_vzQCpJoO41u8sGsOjilgMJaPg0sKypLvZtlZnvCy1tGKW5-TH-IxJ3tiVpZILr42YHVECgZeUBQ6k1Ew6SC3Ob7mgCoqeEwjQA72eLO-sRFqUXi42lz54Qy6ZtzWCHHvtXnxf0ceEkX0lQNq7uZlYhKe'
    }
  ],
  wishlistCount: 2,
  userPoints: 1420,
  userLevel: 'LVL 48 • VIP',
  gameFormat: 'digital', // 'digital' or 'disc'
  freeShippingThreshold: 150,
  discountPercent: 0,
  pollVoted: false,
  pollVotes: {
    berserk: 48,
    tokyo: 26,
    saga: 16,
    spawn: 10
  },
  totalPollVotes: 14892,
  catalog: [
    {
      id: 'neon-ronin',
      title: 'Neon Ronin: Zero Hour Complete',
      category: 'bundles',
      price: 79.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl-rX8iu0ZwhTu595-LjIGnUXLicX5_-uzKlzcxe8eMwNCXitzDmRZTIzY_03onoG2p4Fg9xY_UNYayGr8BEL_SwlYpkgnoPi1OzubOZb6lts8CQAKOqGpdYJKfrke2iJL50OnIIc4TkK6ZHfxAnB5eFJTUKk_WCFBuStg8V5h-Wqn_vjL-4ueZ82v0EKhGxUem1CFCK4OfT4hk-8e3jG6A2Ql4By3SnRWRKIYbRVFaqyZ7W5VL5HY',
      targetId: 'hero'
    },
    {
      id: 'void-genesis',
      title: 'Void Genesis: Dawn Breach #01',
      category: 'comics',
      price: 3.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT04FeQmvUO70RwX-xuclpmF8e2453a7ZYXZGQXKx3Er_iksVKkyxZ9ySE4luv3OZpWLAewcpwUmYtv5H65cRZUvAfze5_vzQCpJoO41u8sGsOjilgMJaPg0sKypLvZtlZnvCy1tGKW5-TH-IxJ3tiVpZILr42YHVECgZeUBQ6k1Ew6SC3Ob7mgCoqeEwjQA72eLO-sRFqUXi42lz54Qy6ZtzWCHHvtXnxf0ceEkX0lQNq7uZlYhKe',
      targetId: 'comics'
    },
    {
      id: 'shinobi-protocol',
      title: 'Shinobi Protocol: Tokyo 2099',
      category: 'comics',
      price: 7.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWoBhUgORdeINVTba40cRGEcxnT47VfPxW40OtTfYBtAOlCsVZewML-Vbr1Z4YRacd6EknN3Hh5G8wjOyBlFjjlIhhC21OaL-PN1iMx9sPLCGp7BZRH9InlDlVtRpPfBgBNTGjcyooi5ZTrbd9wVWXQNtUNhfsUEw4WLMppNM4nE4mg9HhAa63Fu9udkWexFXHQ76extxEyOtAGvHlNlkJxEtvF9zuvt2QFp-GT5cmEX6wiz7437sw',
      targetId: 'comics'
    },
    {
      id: 'aegis-knight',
      title: 'Aegis Knight: Fall of Olympus #04',
      category: 'comics',
      price: 4.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR6gJxvNjNeyzEuwkdWeNfB-E7cOsanDnJWl65EwEFKmrRfqSoMDryNT03gqvibPXzO3ixKNtnwkzaLU0ZBMoXXjrOhcv7xmmhffSqkFJE393YRRHwqbe7jK6WMoPVDAaAxQ4-6VtO3H_iWQmRfpd_5aJCp2h4MUHuxTgNY0WZ7TDwb_yElPKi6iSpXKamH3EsmMj9J8pPwZCrcGfPVSQYRgREIQLI-ixKztIrZGkqIAtn6jkHZLUX',
      targetId: 'comics'
    },
    {
      id: 'star-drifter',
      title: 'Star-Drifter: Black Hole Run',
      category: 'comics',
      price: 9.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmjG2sXttmGAHx2D89v6WMoAZVENq4P10wXWdz0zcSXACKeaBQnyK3ebq_EpPl0VPNKU40aK6vszGjBinw_DZvAlFU6Cn56KiG_mk8iQVSlO1BQs7a0dB_C45uG4hDNXwKcODER5BqzHPq7ln9PA5fk_7pAtLh0egWhpSvNXs_APY_ICIlumc-R0KpjW1aZJTs6coNBUJyxjxxUV29N8oVXJsu9Tgw6lK-UFq2GkgZQXErIfK_SRlx',
      targetId: 'comics'
    },
    {
      id: 'wolverine',
      title: "Marvel's Wolverine",
      category: 'games',
      price: 69.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8eBtY4Xu3O_lKJ9eLwrDndzYVjxgs_V6xHnCNBz_HcaHzS_NWXvPuKVwqcLvNC8mHLZSx5LwnxtZbT1OiE79SZkzjYf_8cn1d8BJgVSUfTfmjxwXjor4MeKCWSmW_wtJK32FIbKOFMbX5eap92uaBFQxsrdI-iNb1OA6hOt-YGVqdimOZ_FXR8AUt6cfXbEiDcvojjT94M0LftXVFkpx0sf6kDqYi3VxtpxqTt-nJ7jzV_HfGG4o',
      targetId: 'games'
    },
    {
      id: 'ghost-yotei',
      title: 'Ghost of Yōtei',
      category: 'games',
      price: 69.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB4JtB_yIKor87hE8QA4h_gYoq2fIGIQ6D6gsuo4jaox2q_V_NmFln6fr9my8GlQC31Eb6c-PbmOq9Gt-vFXY_Abok0qCEjNb00D4CVEsVjlYm0gZblTGRV8UQXXewc4HKTKmHjZVGwcrOIKUYngnBSNsKz3hAhwCz1JjqhWQqtBxQZlDhTZw43HNgRl4UPGFcb9prCb9LFaD_73Q0vvprXGgvSjrzyeBB4ie2x_iWgIB14FZiBvHx',
      targetId: 'games'
    },
    {
      id: 'cyberpunk-trauma',
      title: 'Cyberpunk: Trauma Bundle',
      category: 'games',
      price: 49.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEoTj5kVsppkxsNkOudzbUWWehpHpldM3vkVH1hvlIiXMLvxz0yHHMOo7pMKyST0OM1uPVX9mGNcoV5wYdZubkUwT8I4N1z99wteahYidJvAChpPMbXLgebTRu9L2uKWbTVTffh7yUwz3xXmfvQRPQpOuDG4FJiO6is6Uj8p4_GjWIrk8QzhDNnwD48kLAQlE2Op1CWm-QW2ddtLROaYmjDPnU3nKIuAF2e8DbzmwL9gZ44Df5Yp2R',
      targetId: 'games'
    },
    {
      id: 'spiderman-2',
      title: "Marvel's Spider-Man 2",
      category: 'games',
      price: 59.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVUxBBpUXrCEw7TWdp3ckJJXtQ8FZDPqTZFyuIEcJ-RLk3WxC2pEw4rluBszEUOqfejJH3jwLe8X0xcaVH4BbJYt5qYe6LioO1vecnDAvY4le_9YnZ3uafusUBd5QMlH-GXqXrl_7kIoI8zUovlGHwDljN88p8u9yca9x60zcWdfmknBdmZV8oMwXVj2n4_QhV-Hl_U3jjw7s8gUM4yCU-1WRhj2t8SFCI3QQsbZ_EM6siMXD8I4Pi',
      targetId: 'games'
    },
    {
      id: 'dualsense-edge',
      title: 'DualSense Edge™ Controller',
      category: 'gear',
      price: 199.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-athKZrVP9xYf8H47PyEO7mGSw-SFBK8nwOh9z6w8MCDuJAmdlASvb8f1ey_8lQ6ibk6jhmV7QFSGv6CLmfttXWsN_OBKfAZ4fSCp0JBMbYFkoWhSaAGTVEKAh9Uv_74qmqnRgAJKeR9iOvq3b_8QEsIMg7PNMuU_gVTGVctpQQuty8GxcP2tjftO9583PhhitG1FgfPnGAXApRoOoepEum6pfdH8hLPH3xyNjTrCKi_2tVQqAA-9',
      targetId: 'gear'
    },
    {
      id: 'pulse-elite',
      title: 'Pulse Elite™ Wireless Headset',
      category: 'gear',
      price: 149.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWBctodCof7WsxvSdlSNoFgbB3WBZvBdLOTUfnhtJV_V6D0pEmdWrS0tTl8boMTpisH6XHuG2nGn2RiwTaUDxB_wq8Up317YxR5BXNZpW8qU8flI9rIk7w5X07DYPJuZJ59CZ-SqfztpAEpasqLikn9AAlSW-pmoExnH4PFpZYc9lF8hv8LmckdtskhoRaWxuZNr0fpync-o4GKPX5mg6Iuzd6Yktd0aLxBuqF2VfBqp2ayyFDvLmq',
      targetId: 'gear'
    },
    {
      id: 'ps-portal',
      title: 'PlayStation Portal™ Player',
      category: 'gear',
      price: 199.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdRa_cEW4Loft98egR41KXJ5eaNoVMMXzLO8Hi5EewB21eFPcTM9qOlPqYQHtTsf13mosZ-Gm-pKWYIvLIDOxz5WMwD3q_PQ3uxq2YINBE4A1UVUl6upilWYy_Jxqhx9Wfd6A3AjIZt-JnLmq5A2VB8XRng86oX5PYILY7jgif845NuwKSGtss-TT2WLry7279g59EMWlBsTV6gMeE4zPihDYgFIfdh2wqCXq9QgCN_1_y8XopnRpV',
      targetId: 'gear'
    },
    {
      id: 'laser-plates',
      title: 'Laser-Etched Comic PS5 Plates',
      category: 'gear',
      price: 64.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw4nTr80FbtHXg1YC_yHFb7ikDlHhdCzJkTB284wif082pIO177mn9tgciYCET3eXX1PiER5RAFHNeJGDGxtkyM73o0GYqI6xUBsX2fBKqXrOU_ckXqdsql0pR4jp9e9sMo7byypOEOoiQTFSZtN8yjSkC2D6BpQwsQdXAv35w_4c2XJeJL5wI5H8RhtU33JGAq4D6bWyDhyi-1S05MCmy5qPA3U39xiwLn58O4hcH90V3venj56rH',
      targetId: 'gear'
    },
    {
      id: 'dark-knight-bundle',
      title: 'The Dark Knight Protocol Pack',
      category: 'bundles',
      price: 89.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoUQwq1xMw2r9j1AV-cEbrcu-nx13WjioZy80yk6RgjSUj-qwBTq5JzL-S6WUaZoICLoKb4qZSMCvFeUqv2Wkr1bpeSApmnDWapl4E0qUGcR03Ih1Q21Rms7jTeTEuNf75BWwp3Q9C0zeyzfb49tW-qcVsjem_lAw5CgXAvGItzCgx9xjAk3Fd4hLxJ-k_n6bnsGdIYxB1vOy_bNdWPanYzj9mP1e0ncHwpsZRC5yEtplzRapJXHZi',
      targetId: 'bundles'
    },
    {
      id: 'mecha-assault-bundle',
      title: 'Galactic Mech Assault Complete',
      category: 'bundles',
      price: 74.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCjqrjlLBltrwT71cbG3PF2Qt-rRrRVd91kR3QKbxiB47Nnzaha-Ssu7vphdc4ijIxx7t4hT2WERS2rFYsqDikXF5xOQmIL2oXu9IXtDOYFFGU52urDR5Q2_ejZaxyE4e-F_8gTKcfFuRTThEFzgb764E7tDAwfA-vAstQ-JImXRhezR5CWxA2Q5TlxV6ViuXwEYxrjdf9kKD2b3xVd9WvWt68F4DV2FDNmpeYTNOsa6NqQjG8NoWq',
      targetId: 'bundles'
    }
  ],
  comicReader: {
    title: 'Neon Ronin: Zero Hour #01',
    pages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCl-rX8iu0ZwhTu595-LjIGnUXLicX5_-uzKlzcxe8eMwNCXitzDmRZTIzY_03onoG2p4Fg9xY_UNYayGr8BEL_SwlYpkgnoPi1OzubOZb6lts8CQAKOqGpdYJKfrke2iJL50OnIIc4TkK6ZHfxAnB5eFJTUKk_WCFBuStg8V5h-Wqn_vjL-4ueZ82v0EKhGxUem1CFCK4OfT4hk-8e3jG6A2Ql4By3SnRWRKIYbRVFaqyZ7W5VL5HY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCT04FeQmvUO70RwX-xuclpmF8e2453a7ZYXZGQXKx3Er_iksVKkyxZ9ySE4luv3OZpWLAewcpwUmYtv5H65cRZUvAfze5_vzQCpJoO41u8sGsOjilgMJaPg0sKypLvZtlZnvCy1tGKW5-TH-IxJ3tiVpZILr42YHVECgZeUBQ6k1Ew6SC3Ob7mgCoqeEwjQA72eLO-sRFqUXi42lz54Qy6ZtzWCHHvtXnxf0ceEkX0lQNq7uZlYhKe',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWoBhUgORdeINVTba40cRGEcxnT47VfPxW40OtTfYBtAOlCsVZewML-Vbr1Z4YRacd6EknN3Hh5G8wjOyBlFjjlIhhC21OaL-PN1iMx9sPLCGp7BZRH9InlDlVtRpPfBgBNTGjcyooi5ZTrbd9wVWXQNtUNhfsUEw4WLMppNM4nE4mg9HhAa63Fu9udkWexFXHQ76extxEyOtAGvHlNlkJxEtvF9zuvt2QFp-GT5cmEX6wiz7437sw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCR6gJxvNjNeyzEuwkdWeNfB-E7cOsanDnJWl65EwEFKmrRfqSoMDryNT03gqvibPXzO3ixKNtnwkzaLU0ZBMoXXjrOhcv7xmmhffSqkFJE393YRRHwqbe7jK6WMoPVDAaAxQ4-6VtO3H_iWQmRfpd_5aJCp2h4MUHuxTgNY0WZ7TDwb_yElPKi6iSpXKamH3EsmMj9J8pPwZCrcGfPVSQYRgREIQLI-ixKztIrZGkqIAtn6jkHZLUX',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCmjG2sXttmGAHx2D89v6WMoAZVENq4P10wXWdz0zcSXACKeaBQnyK3ebq_EpPl0VPNKU40aK6vszGjBinw_DZvAlFU6Cn56KiG_mk8iQVSlO1BQs7a0dB_C45uG4hDNXwKcODER5BqzHPq7ln9PA5fk_7pAtLh0egWhpSvNXs_APY_ICIlumc-R0KpjW1aZJTs6coNBUJyxjxxUV29N8oVXJsu9Tgw6lK-UFq2GkgZQXErIfK_SRlx'
    ],
    currentPage: 0
  }
};

// DOM Content Loaded Initializer
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  setupEventListeners();
  setupLiveSearch();
  setupPoll();
  setupRockerFormat();
  setupSoundToggle();
});

// Toast notification helper
function showToast(message, type = 'primary', icon = 'bolt') {
  sfx.playChime();
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slide-out-toast 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Cart Drawer Renderer & Calculations
function renderCart() {
  const cartList = document.getElementById('cartItemsList');
  const cartCountEl = document.getElementById('cartCountBadge');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartDiscountRow = document.getElementById('cartDiscountRow');
  const cartDiscountEl = document.getElementById('cartDiscount');
  const cartTotalEl = document.getElementById('cartTotal');
  const shippingText = document.getElementById('shippingProgressText');
  const shippingFill = document.getElementById('shippingProgressBar');

  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartCountEl) {
    cartCountEl.textContent = totalQty;
    cartCountEl.style.display = totalQty > 0 ? 'flex' : 'none';
  }

  if (!cartList) return;

  if (state.cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-state">
        <span class="material-symbols-outlined">shopping_bag</span>
        <h4>Your Dock Is Clear</h4>
        <p class="font-body-sm text-secondary">Browse comics and PS5 equipment to load your station.</p>
      </div>
    `;
    if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00';
    if (cartTotalEl) cartTotalEl.textContent = '$0.00';
    if (shippingFill) shippingFill.style.width = '0%';
    if (shippingText) shippingText.textContent = `Add $${state.freeShippingThreshold} for free armored shipping`;
    return;
  }

  cartList.innerHTML = state.cart.map(item => `
    <div class="cart-item-row" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.title}</div>
        <div class="cart-item-type">${item.type}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-qty-ctrl">
        <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
        <span class="cart-qty-val">${item.qty}</span>
        <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
      </div>
      <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')" title="Remove item">
        <span class="material-symbols-outlined" style="font-size: 1.15rem;">delete</span>
      </button>
    </div>
  `).join('');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = subtotal * state.discountPercent;
  const total = Math.max(0, subtotal - discount);

  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (cartDiscountRow) {
    cartDiscountRow.style.display = state.discountPercent > 0 ? 'flex' : 'none';
    if (cartDiscountEl) cartDiscountEl.textContent = `-$${discount.toFixed(2)}`;
  }
  if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

  // Shipping progress calculation
  const remaining = Math.max(0, state.freeShippingThreshold - total);
  const percent = Math.min(100, Math.round((total / state.freeShippingThreshold) * 100));
  if (shippingFill) shippingFill.style.width = `${percent}%`;
  if (shippingText) {
    if (remaining === 0) {
      shippingText.innerHTML = `<span style="color: var(--success); font-weight: 700;">✓ Armored 2-Day Shipping Unlocked!</span>`;
    } else {
      shippingText.textContent = `Add $${remaining.toFixed(2)} more for FREE armored shipping`;
    }
  }
}

// Add Item to Cart
window.addToCart = function(id, title, type, price, image) {
  sfx.playConfirm();
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id, title, type, price: parseFloat(price), qty: 1, image });
  }
  renderCart();
  showToast(`"${title}" added to dock`, 'primary', 'shopping_bag');
  
  // Highlight cart button with ripple
  const cartBtn = document.getElementById('openCartBtn');
  if (cartBtn) {
    cartBtn.style.transform = 'scale(1.15)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
  }
};

// Quantity update
window.updateCartQty = function(id, delta) {
  sfx.playClick();
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
    showToast(`Removed from dock`, 'secondary', 'delete');
  }
  renderCart();
};

window.removeFromCart = function(id) {
  sfx.playClick();
  state.cart = state.cart.filter(i => i.id !== id);
  renderCart();
  showToast(`Item removed from dock`, 'secondary', 'delete');
};

// Drawer controls
function toggleCart(open = null) {
  sfx.playClick();
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (!drawer || !overlay) return;

  const isOpen = open !== null ? open : !drawer.classList.contains('open');
  if (isOpen) {
    drawer.classList.add('open');
    overlay.classList.add('open');
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Cart open/close triggers
  const cartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const overlay = document.getElementById('cartDrawerOverlay');

  if (cartBtn) cartBtn.addEventListener('click', () => toggleCart(true));
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
  if (overlay) overlay.addEventListener('click', () => toggleCart(false));

  // Wishlist heart buttons
  const wishlistBtn = document.getElementById('wishlistBtn');
  const wishlistBadge = document.getElementById('wishlistCountBadge');
  if (wishlistBtn && wishlistBadge) {
    wishlistBtn.addEventListener('click', () => {
      sfx.playConfirm();
      state.wishlistCount += 1;
      wishlistBadge.textContent = state.wishlistCount;
      showToast(`Saved to VIP Wishlist (${state.wishlistCount} items)`, 'secondary', 'favorite');
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileMenu = document.getElementById('mobileNavMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      sfx.playClick();
      mobileMenu.classList.toggle('open');
    });
  }

  // Vault Sector Quick Filter pills
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      sfx.playClick();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterType = pill.getAttribute('data-filter');
      applyVaultFilter(filterType);
    });
  });

  // Promo code in cart
  const promoBtn = document.getElementById('applyPromoBtn');
  const promoInput = document.getElementById('promoCodeInput');
  if (promoBtn && promoInput) {
    promoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'OMNI15' || code === 'VIP15') {
        state.discountPercent = 0.15;
        renderCart();
        showToast('VIP Voucher Applied: 15% OFF entire dock!', 'success', 'verified');
        promoInput.disabled = true;
        promoBtn.textContent = 'APPLIED';
        promoBtn.style.background = 'var(--success)';
      } else if (code) {
        showToast('Invalid Access Code. Try "OMNI15"', 'secondary', 'warning');
      }
    });
  }

  // Checkout trigger
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Dock is currently empty!', 'secondary', 'warning');
        return;
      }
      sfx.playConfirm();
      showToast('Initiating PSN Direct Telemetry Key Handshake...', 'primary', 'sync');
      setTimeout(() => {
        showToast('✓ 3 Digital Keys Delivered & Armored Package Dispatched!', 'success', 'verified');
        state.cart = [];
        state.userPoints += 250;
        updateUserHeader();
        renderCart();
        toggleCart(false);
      }, 1500);
    });
  }

  // Comic Reader buttons
  const previewButtons = document.querySelectorAll('.open-reader-btn');
  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const comicName = btn.getAttribute('data-comic') || 'Neon Ronin: Zero Hour #01';
      openComicReader(comicName);
    });
  });

  // Reader Modal controls
  const closeReaderBtn = document.getElementById('closeReaderBtn');
  const readerOverlay = document.getElementById('readerModalOverlay');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');

  if (closeReaderBtn) closeReaderBtn.addEventListener('click', closeComicReader);
  if (readerOverlay) {
    readerOverlay.addEventListener('click', (e) => {
      if (e.target === readerOverlay) closeComicReader();
    });
  }
  if (prevPageBtn) prevPageBtn.addEventListener('click', () => changeReaderPage(-1));
  if (nextPageBtn) nextPageBtn.addEventListener('click', () => changeReaderPage(1));

  // VIP Free trial triggers
  const vipBtns = document.querySelectorAll('.vip-trial-trigger');
  vipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playChime();
      state.userLevel = 'LVL 49 • VIP ULTRA';
      state.userPoints += 500;
      updateUserHeader();
      showToast('OmniPass VIP Ultra Activated! 15% discount & 50,000+ issues unlocked!', 'success', 'stars');
    });
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sfx.playConfirm();
      showToast('Transmitting agent credential... Welcome to OmniCore!', 'success', 'check_circle');
      newsletterForm.reset();
    });
  }
}

// User Header UI
function updateUserHeader() {
  const rankEl = document.getElementById('userRankDisplay');
  const ptsEl = document.getElementById('userPointsDisplay');
  if (rankEl) rankEl.textContent = state.userLevel;
  if (ptsEl) ptsEl.textContent = `${state.userPoints.toLocaleString()} PTS`;
}

// Vault Sector Filter logic
function applyVaultFilter(category) {
  const cards = document.querySelectorAll('[data-sector]');
  cards.forEach(card => {
    const cardSector = card.getAttribute('data-sector');
    if (category === 'all' || cardSector === category || (category === 'comics' && cardSector === 'manga')) {
      card.style.display = '';
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease';
        card.style.opacity = '1';
      }, 30);
    } else {
      card.style.display = 'none';
    }
  });

  // Smooth scroll to relevant section if clicked from filter
  if (category === 'comics' || category === 'manga') {
    document.getElementById('comics')?.scrollIntoView({ behavior: 'smooth' });
  } else if (category === 'games') {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  } else if (category === 'gear') {
    document.getElementById('gear')?.scrollIntoView({ behavior: 'smooth' });
  } else if (category === 'bundles') {
    document.getElementById('bundles')?.scrollIntoView({ behavior: 'smooth' });
  }
}

// Digital Code vs Disc Case Switcher in PS5 Section
function setupRockerFormat() {
  const rockerButtons = document.querySelectorAll('.rocker-btn');
  rockerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      rockerButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const format = btn.getAttribute('data-format');
      state.gameFormat = format;

      const subTags = document.querySelectorAll('.game-delivery-meta');
      subTags.forEach(el => {
        el.textContent = format === 'digital' ? 'Direct Key Delivery' : 'Armored Disc + Lithograph';
      });

      showToast(`Selected PS5 Format: ${format === 'digital' ? 'Instant Digital PSN Delivery' : 'Collector Sealed Disc Box'}`, 'primary', 'videogame_asset');
    });
  });
}

// Live Search with Autocomplete Dropdown
function setupLiveSearch() {
  const input = document.getElementById('siteSearchInput');
  const dropdown = document.getElementById('searchResultsDropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      return;
    }

    const matches = state.catalog.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 1rem; color: var(--text-muted); font-size: 0.8125rem;">
          No telemetry results for "${query}"
        </div>
      `;
    } else {
      dropdown.innerHTML = matches.map(item => `
        <div class="search-result-item" onclick="jumpToItem('${item.targetId}', '${item.id}')">
          <img src="${item.image}" alt="${item.title}" class="search-result-thumb">
          <div class="search-result-info">
            <div class="search-result-title">${item.title}</div>
            <div class="search-result-meta">${item.category.toUpperCase()} SECTOR</div>
          </div>
          <div class="search-result-price">$${item.price.toFixed(2)}</div>
        </div>
      `).join('');
    }
    dropdown.classList.add('active');
  });

  // Hide dropdown on blur
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      dropdown.classList.remove('active');
    }
  });
}

window.jumpToItem = function(targetSectionId, itemId) {
  sfx.playClick();
  const dropdown = document.getElementById('searchResultsDropdown');
  if (dropdown) dropdown.classList.remove('active');

  const section = document.getElementById(targetSectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    const targetCard = document.querySelector(`[data-product-id="${itemId}"]`);
    if (targetCard) {
      targetCard.style.outline = '2px solid var(--secondary)';
      targetCard.style.boxShadow = '0 0 25px var(--secondary-glow)';
      setTimeout(() => {
        targetCard.style.outline = '';
        targetCard.style.boxShadow = '';
      }, 2500);
    }
  }
};

// Interactive Comic Reader Modal
function openComicReader(title) {
  sfx.playConfirm();
  state.comicReader.title = title;
  state.comicReader.currentPage = 0;

  const modal = document.getElementById('readerModalOverlay');
  const titleEl = document.getElementById('readerComicTitle');
  const imgEl = document.getElementById('readerPageImg');
  const counterEl = document.getElementById('readerPageCounter');

  if (titleEl) titleEl.textContent = title;
  if (imgEl) imgEl.src = state.comicReader.pages[0];
  if (counterEl) counterEl.textContent = `PAGE 1 OF ${state.comicReader.pages.length}`;
  if (modal) modal.classList.add('open');
}

function closeComicReader() {
  sfx.playClick();
  const modal = document.getElementById('readerModalOverlay');
  if (modal) modal.classList.remove('open');
}

function changeReaderPage(delta) {
  sfx.playClick();
  const total = state.comicReader.pages.length;
  let next = state.comicReader.currentPage + delta;
  if (next < 0) next = 0;
  if (next >= total) next = total - 1;

  state.comicReader.currentPage = next;
  const imgEl = document.getElementById('readerPageImg');
  const counterEl = document.getElementById('readerPageCounter');

  if (imgEl) {
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = state.comicReader.pages[next];
      imgEl.style.opacity = '1';
    }, 120);
  }
  if (counterEl) counterEl.textContent = `PAGE ${next + 1} OF ${total}`;
}

// Community Telemetry Poll
function setupPoll() {
  const pollRows = document.querySelectorAll('.poll-option-row');
  const votesCountEl = document.getElementById('totalVotesCount');

  pollRows.forEach(row => {
    row.addEventListener('click', () => {
      if (state.pollVoted) {
        showToast('Telemetry transmission already logged for this cycle!', 'secondary', 'info');
        return;
      }
      sfx.playConfirm();
      state.pollVoted = true;
      row.classList.add('voted');

      const option = row.getAttribute('data-poll-key');
      state.totalPollVotes += 1;
      if (votesCountEl) votesCountEl.textContent = state.totalPollVotes.toLocaleString();

      // Recalculate percent bar
      const fillBar = row.querySelector('.poll-fill-bar');
      const percentEl = row.querySelector('.poll-percent');
      if (fillBar && percentEl) {
        let current = parseInt(percentEl.textContent) || 30;
        current += 2;
        percentEl.textContent = `${current}%`;
        fillBar.style.width = `${current}%`;
      }

      state.userPoints += 100;
      updateUserHeader();
      showToast('+100 OmniVerse Points awarded for poll participation!', 'success', 'verified');
    });
  });
}

// Audio SFX Switcher in Top Navigation
function setupSoundToggle() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    const isNowOn = sfx.toggle();
    if (isNowOn) {
      soundBtn.classList.remove('sound-off');
      soundBtn.querySelector('.material-symbols-outlined').textContent = 'volume_up';
      sfx.playClick();
      showToast('Cybernetic UI Audio Enabled', 'primary', 'volume_up');
    } else {
      soundBtn.classList.add('sound-off');
      soundBtn.querySelector('.material-symbols-outlined').textContent = 'volume_off';
      showToast('Audio Muted', 'secondary', 'volume_off');
    }
  });
}
