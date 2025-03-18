<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-5 border border-border-light-gray">
    <p class="text-lg font-semibold text-center mb-4">{{ conversionText }}</p>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block font-semibold" for="fromAmount">Amount:</label>
        <AppInputNumber 
          v-model="amountFrom" 
          id="fromAmount" 
          aria-label="Amount to convert" 
          placeholder="Enter amount"
        />
      </div>
      <div>
        <label class="block font-semibold" for="fromCurrency">From:</label>
        <AppSelector 
          v-model="fromCurrency" 
          :options="currencies" 
          id="fromCurrency" 
          aria-label="Currency selection" 
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block font-semibold" for="toAmount">Converted:</label>
        <AppInputNumber 
          v-model="amountTo" 
          id="toAmount"
          aria-label="Amount to convert"  
          :disabled="true" 
        />
      </div>
      <div>
        <label class="block font-semibold" for="toCurrency">To:</label>
        <AppSelector 
          v-model="toCurrency" 
          :options="currencies" 
          id="toCurrency" 
          aria-label="Currency selection"
        />
      </div>
    </div>

    <p v-if="errorMessage" class="mt-4 text-error text-12">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import AppSelector from "@/components/AppSelector.vue";
import AppInputNumber from "@/components/AppInputNumber.vue";
import { fetchCurrencies, convertCurrency } from "@/services/currencyService";
import { formatCurrency } from "@/helpers/formatCurrencyHelper";

const currencies = ref<{ code: string; name: string }[]>([]);
const fromCurrency = ref("USD");
const toCurrency = ref("PLN");
const amountFrom = ref(1);
const amountTo = ref<number | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const lastConversionText = ref("");

onMounted(async () => {
  try {
    currencies.value = await fetchCurrencies();
    await handleConvert();
  } catch (error) {
    errorMessage.value = "Failed to load currencies.";
  }
});

const handleConvert = async () => {
  if (!amountFrom.value) return;
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const { toValue } = await convertCurrency(fromCurrency.value, toCurrency.value, amountFrom.value);
    amountTo.value = formatCurrency(toValue);
  } catch (error) {
    errorMessage.value = "Conversion failed.";
  }
  isLoading.value = false;
};

watch([fromCurrency, toCurrency, amountFrom], handleConvert, { immediate: true });

const conversionText = computed(() => {
  if (!amountFrom.value) return lastConversionText.value;

  const fromLabel = currencies.value.find(c => c.code === fromCurrency.value)?.name || fromCurrency.value;
  const toLabel = currencies.value.find(c => c.code === toCurrency.value)?.name || toCurrency.value;
  const result = `${amountFrom.value} ${fromLabel} is equivalent to ${amountTo?.value || "..."} ${toLabel}`;

  lastConversionText.value = result;
  return result;
});
</script>
