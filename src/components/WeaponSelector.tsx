import { useState, useEffect } from 'react';
import { Weapon } from '@/types/loadout';
import { weapons, attachments, weaponCategories, getWeaponsBySubdivision, attachmentCategories } from '@/data/weapons';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomCheckbox } from '@/components/ui/custom-checkbox';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GiPistolGun, GiCrosshair, GiMachineGun, GiShotgun, GiBowman } from "react-icons/gi";
import { FaBolt } from "react-icons/fa";
import { motion } from 'framer-motion';

interface WeaponSelectorProps {
  selectedWeapon: Weapon | null;
  onWeaponSelect: (weapon: Weapon) => void;
}

const WeaponSelector = ({ selectedWeapon, onWeaponSelect }: WeaponSelectorProps) => {
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('assault');
  const [selectedSubdivision, setSelectedSubdivision] = useState('ar_automatic');

  // Reset subdivision when category changes
  useEffect(() => {
    // Get the first subdivision of the selected category
    const category = weaponCategories.find(cat => cat.id === selectedCategory);
    if (category && category.subDivisions.length > 0) {
      setSelectedSubdivision(category.subDivisions[0].id);
    }
  }, [selectedCategory]);

  // NEW: Update parent when attachments change
  useEffect(() => {
    if (selectedWeapon) {
      onWeaponSelect({ ...selectedWeapon, attachments: selectedAttachments });
    }
  }, [selectedAttachments]);

  const handleWeaponSelect = (weapon: Weapon) => {
    const weaponWithAttachments = {
      ...weapon,
      attachments: selectedAttachments
    };
    onWeaponSelect(weaponWithAttachments);
  };

  const handleAttachmentToggle = (attachment: string) => {
    if (selectedAttachments.length >= 5 && !selectedAttachments.includes(attachment)) {
      return; // Max 5 attachments
    }
    
    setSelectedAttachments(prev => 
      prev.includes(attachment) 
        ? prev.filter(a => a !== attachment)
        : [...prev, attachment]
    );
  };

  // Get the current category
  const currentCategory = weaponCategories.find(cat => cat.id === selectedCategory);

  // Count selected attachments per category
  const getSelectedCountForCategory = (categoryId: string) => {
    const category = attachmentCategories.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    return selectedAttachments.filter(attachment => 
      category.attachments.includes(attachment)
    ).length;
  };

  // Icon mapping for weapon categories
  const categoryIcons: Record<string, JSX.Element> = {
    assault: <GiPistolGun className="text-codm-orange text-xl" />,
    smg: <FaBolt className="text-codm-orange text-xl" />,
    sniper: <GiCrosshair className="text-codm-orange text-xl" />,
    lmg: <GiMachineGun className="text-codm-orange text-xl" />,
    shotgun: <GiShotgun className="text-codm-orange text-xl" />,
    marksman: <GiBowman className="text-codm-orange text-xl" />,
  };

  return (
    <>
      <Tabs
        defaultValue="assault"
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="mb-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="bg-codm-gray-light/60 rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col items-center mb-4">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="mb-2"
              >
                <GiPistolGun className="text-codm-orange text-3xl drop-shadow" />
              </motion.span>
              <h3 className="text-2xl font-bold text-codm-orange font-orbitron tracking-wide mb-1">
                SELECT WEAPON CATEGORY
              </h3>
              <div className="w-16 h-1 bg-codm-orange rounded-full mb-2" />
            </div>
            <div className="flex justify-center">
              <div className="flex gap-2 w-full max-w-2xl mx-auto">
                {weaponCategories.map((category, i) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    className={`flex-1 flex flex-col items-center justify-center py-1 px-0 rounded-full border-2 transition-all focus:outline-none
                      ${selectedCategory === category.id
                        ? 'border-codm-orange bg-codm-orange/20 text-codm-orange shadow-lg scale-105'
                        : 'border-codm-orange/30 bg-background/80 text-white hover:bg-codm-orange/10'}
                    `}
                    whileHover={{ scale: 1.08, boxShadow: "0 0 8px #ff8c00" }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.4 }}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="text-xl mb-0.5">{categoryIcons[category.icon]}</span>
                    <span className="text-[10px] font-semibold">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {weaponCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            {/* Sub-division Tabs */}
            <Tabs 
              defaultValue={category.subDivisions[0]?.id} 
              value={selectedSubdivision}
              onValueChange={setSelectedSubdivision}
              className="mb-4"
            >
              <h4 className="text-lg font-semibold text-white mb-2">SELECT SUB-TYPE</h4>
              <TabsList className="flex gap-2 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible">
                {category.subDivisions.map(sub => (
                  <TabsTrigger
                    key={sub.id}
                    value={sub.id}
                    className="min-w-[120px] md:min-w-0 md:flex-1 rounded-full px-3 py-1 text-xs font-semibold bg-background/80 border border-codm-orange/30 hover:bg-codm-orange/10 transition-all"
                  >
                    {sub.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {category.subDivisions.map(sub => (
                <TabsContent key={sub.id} value={sub.id} className="mt-4">
                  {/* Weapon Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {getWeaponsBySubdivision(category.id, sub.id).map(weapon => (
                      <Card
                        key={weapon.id}
                        className={cn(
                          "weapon-card cursor-pointer transition-all border-2",
                          selectedWeapon?.id === weapon.id 
                            ? "border-codm-orange bg-codm-gray-light" 
                            : "border-transparent hover:border-codm-orange/50 hover:bg-codm-gray-light/50"
                        )}
                        onClick={() => handleWeaponSelect(weapon)}
                      >
                        <div className="p-4">
                          <div className="text-lg font-semibold text-white mb-2">{weapon.name}</div>
                          <Badge variant="secondary" className="bg-codm-orange/20 text-codm-orange">
                            {category.name}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>

      {/* Attachments */}
      {selectedWeapon && (
        <div>
          <h4 className="text-lg font-semibold text-codm-orange mb-4">
            ATTACHMENTS ({selectedAttachments.length}/5)
          </h4>
          
          <Accordion type="multiple" className="w-full">
            {attachmentCategories.map(category => {
              const selectedCount = getSelectedCountForCategory(category.id);
              return (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className="text-white hover:text-codm-orange">
                    <div className="flex justify-between w-full pr-4">
                      <span>{category.name}</span>
                      {selectedCount > 0 && (
                        <Badge variant="outline" className="ml-2 bg-codm-orange text-white">
                          {selectedCount}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <motion.div
                      className="grid grid-cols-2 md:grid-cols-3 gap-3 py-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.05 } },
                      }}
                    >
                      {category.attachments.map((attachment) => (
                        <motion.div
                          key={attachment}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          whileHover={{ scale: 1.04, boxShadow: '0 0 8px #ff8c00' }}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            "flex items-center space-x-2 p-3 bg-codm-gray rounded-lg transition-colors",
                            selectedAttachments.includes(attachment)
                              ? "bg-codm-gray-light border border-[#ff4444]/50"
                              : "hover:bg-codm-gray-light border border-transparent",
                            selectedAttachments.length >= 5 && !selectedAttachments.includes(attachment) && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <CustomCheckbox
                            id={attachment}
                            checked={selectedAttachments.includes(attachment)}
                            onCheckedChange={() => handleAttachmentToggle(attachment)}
                            disabled={selectedAttachments.length >= 5 && !selectedAttachments.includes(attachment)}
                          />
                          <label
                            htmlFor={attachment}
                            className={cn(
                              "text-sm cursor-pointer flex-1",
                              selectedAttachments.includes(attachment) ? "text-white font-medium" : "text-gray-300"
                            )}
                          >
                            {attachment}
                          </label>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}
    </>
  );
};

export default WeaponSelector;
